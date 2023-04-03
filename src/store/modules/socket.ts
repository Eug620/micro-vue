/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-04-03 17:49:33
 * @FilePath     : /micro-vue/src/store/modules/socket.ts
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */
import { defineStore } from "pinia";
import io from "socket.io-client";
import { useUserStore } from "@/store/modules/user";
import { Notification } from "@arco-design/web-vue";
import ServerApi from "@/api";
interface MsgInterface {
    data: {
        payload: {
            message: string;
        };
    };
    meta: {
        timestamp: string;
        client: string;
        clientName: string;
        clientAvatar: string | undefined | null;
    };
}
export const useSocketStore = defineStore({
    id: 'socket',
    state: () => ({
        socket: <any>{},
        rooms: <any>{}
    }),
    getters: {
        getRooms(state) {
            return state.rooms
        }
    },
    actions: {
        getRoomsName(id: string) {
            return this.rooms[id] ? this.rooms[id].info.name : '错误ID'
        },
        initSocket(room: any) {
            // 没有加入任何房间
            if (!room.length) {
                // 断开原有链接
                if (this.socket){
                    this.socket.close()
                    this.socket = null
                }
                return 
            }
            const userStore = useUserStore();
            console.log('initSocket: UserID-->' + userStore.getInfo.id);
            this.socket = io(
                // 'http://127.0.0.1:5000'
                'https://eug.asia:7001'
                , {
                    transports: ["websocket"],
                    query: {
                        // room: room.map((v: any) => v.id),
                        token: userStore.getToken,
                        // userId: userStore.getInfo.id,
                    },
                    reconnection: false, //启用重新连接
                    // forceBase64: true, // 内容加密
                    // withCredentials: true
                });
            this.socket.on("connect", () => {
                console.log("😄 :: connect success");
            });

            this.socket.on("connect_error", (err: any) => {
                console.log("💔 :: connect error", err);
            });
            // 上线通知
            this.socket.on("online", (msg: any) => {
                const isOnline = msg.action !== 'leave'
                this.useOnlineStatus(msg.room, msg.user, isOnline)
                if (isOnline) {
                    msg.clients.forEach((item: string) => {
                        this.useOnlineStatus(msg.room, item, isOnline)
                    })
                }

                // console.log("🔗 :", msg);
                // const {clients} = msg
                // SocketStore.rooms[msg.room] = Object.assign(SocketStore.rooms, {clients})

                // Notification[isOnline ? 'success' : 'warning']({
                //   content: msg.message,
                //   title:  this.getRoomsName(msg.room),
                //   position: 'bottomRight',
                //   duration: 5000
                // })
            });
            // 刷新房间信息 || 房间内成员信息
            this.socket.on("refresh", (msg: any) => {
                this.useGetRoomsOwn()
            })
            // 重联
            const tryReconnect = () => {
                if (!userStore.isLogin) return
                console.log("🤔 :: close.....");
                setTimeout(() => {
                    this.socket.io.open((err: any) => {
                        if (err) {
                            tryReconnect();
                        }
                    });
                }, 2000);
            };

            this.socket.io.on("close", tryReconnect);
        },
        // 用户状态变化
        useOnlineStatus(room: string, user: string, isOnline: Boolean) {
            try {
                this.rooms[room].info.subscriber.find((v: any) => {
                    if (v.id === user) {
                        v.isOnline = isOnline
                        return true
                    }
                })
                const onlineInfo = this.rooms[room].onlineInfo.get(user)
                this.rooms[room].onlineInfo.set(user, Object.assign(onlineInfo, { isOnline }))
            } catch (err) { }
        },
        async useGetRoomsOwn() {
            try {
                let res = await ServerApi.RoomsOwnRoom();
                if (res.code === 200) {
                    this.initRooms(res.data);
                }
            } catch (error) { }
        },
        closeSocket() {
            this.socket && this.socket.close()
            this.socket = null
        },
        useMonitor(...arg: any) {
            this.socket.on(...arg)
        },
        useEmit(...arg: any) {
            this.socket.emit(...arg)
        },
        initRooms(rooms: any[]) {
            const userStore = useUserStore();
            this.initSocket(rooms)

            // 对比已经失效的房间
            const NewRoomIds = new Set()
            // 循环生成对应的房间
            for (let index = 0; index < rooms.length; index++) {
                const room = rooms[index];
                NewRoomIds.add(room.id)
                this.rooms[room.id] = {
                    clients: [],
                    info: room,
                    messageCount: 0,
                    messageList: [],
                    onlineInfo: new Map()
                }
                ServerApi.RoomsRecords({room_id: room.id}).then((res: any) => {
                    if (res.code === 200) {
                        this.rooms[room.id].messageList = res.data || []
                    }
                })

                // 初始化在线信息
                room.subscriber.forEach((item: any) => {
                    this.rooms[room.id].onlineInfo.set(item.id, Object.assign({ isOnline: false }, item))
                })

                // 接受房间信息
                this.useMonitor(room.id, (res: MsgInterface) => {
                    // console.log("💻 :", res);

                    // 自己发的信息无需新增
                    if (res.meta.client !== userStore.getInfo.id) {
                        this.rooms[room.id]['messageCount']++
                    }
                    this.rooms[room.id]['messageList'].push({
                        timestamp: res.meta.timestamp,
                        id: res.meta.client,
                        name: res.meta.clientName,
                        avatar: res.meta.clientAvatar,
                        message: res.data.payload.message,
                    });
                })
            }
            
            // 移除失效房间
            for (const key in this.rooms) {
                if (!NewRoomIds.has(key)) {
                    delete this.rooms[key]
                }
            }
        },
        useResetRoomCount(id: string) {
            if (this.rooms[id]) {
                this.rooms[id]['messageCount'] = 0
            }
        },
        useEmitRoomMessage(id: string, message: string) {
            this.useEmit('confabulate', {
                target: id,
                payload: { message },
            })
        },
        useGetRoomMessageList(id: string) {
            return this.rooms[id]?.messageList
        },
        useGetRoomInfo(id: string) {
            return this.rooms[id]?.info
        },
        useGetOnlineInfo(id: string) {
            return this.rooms[id]?.onlineInfo
        }
    }
})