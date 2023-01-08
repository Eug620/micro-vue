/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-10-26 14:12:34
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
        clientName: string
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
        getRoomsName(id:string) {
            return this.rooms[id] ? this.rooms[id].info.name : '错误ID'
        },
        initSocket(room: any) {
            if(!room.length) return
            const userStore = useUserStore();
            console.log('initSocket: UserID-->' + userStore.getInfo.id);
            this.socket = io(
                // 'http://127.0.0.1:5000'
                "http://47.93.229.170:5000"
                , {
                    transports: ["websocket"],
                    query: {
                        room: room.map((v:any) => v.id),
                        token: userStore.getToken,
                        userId: userStore.getInfo.id,
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
                // console.log("🔗 :", msg);
                // const {clients} = msg
                // SocketStore.rooms[msg.room] = Object.assign(SocketStore.rooms, {clients})
                Notification[msg.action === 'leave' ? 'warning' : 'success']({
                  content: msg.message,
                  title:  this.getRoomsName(msg.room),
                  position: 'bottomRight',
                  duration: 5000
                })
            });
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
        async useGetRoomsOwn() {
            try {
                let res = await ServerApi.RoomsOwnRoom();
                if (res.code === 200) {
                    this.initRooms(res.data);
                }
            } catch (error) { }
        },
        closeSocket() {
            this.socket.close()
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
            rooms.forEach((room: any) => {
                if (!this.rooms[room.id]) {
                    this.rooms[room.id] = {
                        clients: [],
                        info: room,
                        messageCount: 0,
                        messageList: [],
                    }
                    // 接受房间信息
                    this.useMonitor(room.id, (res: MsgInterface) => {
                        // console.log("💻 :", res);
                        
                        // 自己发的信息无需新增
                        if (res.meta.client !== userStore.getInfo.id) {
                            this.rooms[room.id]['messageCount']++
                        }
                        this.rooms[room.id]['messageList'].push({
                            timestamp:  res.meta.timestamp,
                            id: res.meta.client,
                            name: res.meta.clientName,
                            message: res.data.payload.message,
                        });
                    })
                }
            })
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
        }
    }
})