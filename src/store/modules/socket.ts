/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-09-22 11:45:13
 * @FilePath     : /micro-vue/src/store/modules/socket.ts
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */
import { defineStore } from "pinia";
import io from "socket.io-client";
import { useUserStore } from "@/store/modules/user";
interface MsgInterface {
    data: {
        payload: {
            message: string;
        };
    };
    meta: {
        client: string;
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
        initSocket() {
            const userStore = useUserStore();
            console.log('initSocket: UserID-->' + userStore.getInfo.id);

            this.socket = io("http://47.93.229.170:5000", {
                transports: ["websocket"],
                query: {
                    room: 'wtf',
                    id: 'hhhh',
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
            // 重联
            const tryReconnect = () => {
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
        useMonitor(...arg: any) {
            this.socket.on(...arg)
        },
        useEmit(...arg: any) {
            this.socket.emit(...arg)
        },
        initRooms(rooms: any[]) {
            rooms.forEach((room: any) => {
                if (!this.rooms[room.id]) {
                    this.rooms[room.id] = {
                        info: room,
                        messageCount: 0,
                        messageList: []
                    }
                    this.useMonitor(room.id, (res: MsgInterface) => {
                        console.log("💻 :", res);
                        this.rooms[room.id]['messageCount']++
                        this.rooms[room.id]['messageList'].push({
                            id: res.meta.client,
                            message: `${res.meta.client} :   ${res.data.payload.message}`,
                        });
                    })
                }
            })
        },
        useResetRoomCount(id: string) {
            this.rooms[id]['messageCount'] = 0
        },
        useEmitRoomMessage(id: string, message: string) {
            this.useEmit('confabulate', {
                target: id,
                payload: { message },
            })
        },
        useGetRoomMessageList(id: string) {
            return this.rooms[id]['messageList']
        }
    }
})