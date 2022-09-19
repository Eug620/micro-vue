/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-09-18 05:52:49
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-19 10:51:06
 * @FilePath: /micro-vue/src/store/modules/socket.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import io from "socket.io-client";
import { useUserStore } from "@/store/modules/user";
export const useSocketStore = defineStore({
    id: 'socket',
    state: () => ({
        socket: <any>{},
    }),
    actions: {
        initSocket() {
            const userStore = useUserStore();
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
        useMonitor(...arg:any) {
            this.socket.on(...arg)
        },
        useEmit(...arg:any) {
            this.socket.emit(...arg)
        }
    }
})