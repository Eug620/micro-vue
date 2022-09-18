/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-09-18 05:52:49
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-19 00:04:01
 * @FilePath: /micro-vue/src/store/modules/socket.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";
import io from "socket.io-client";
import { useUserStore } from "@/store/modules/user";
import { markRaw } from "vue";
export const useSocketStore = defineStore({
    id: 'socket',
    state: () => ({
        socket: null,
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
            (this.socket as any).on("connect", () => {
                console.log("😄 :: connect success");
            });

            (this.socket as any).on("connect_error", (err: any) => {
                console.log("💔 :: connect error", err);
            });

            // 重联
            const tryReconnect = () => {
                console.log("🤔 :: close.....");
                setTimeout(() => {
                    (this.socket as any).io.open((err: any) => {
                        if (err) {
                            tryReconnect();
                        }
                    });
                }, 2000);
            };
            (this.socket as any).io.on("close", tryReconnect);
        },
        useMonitor(...arg:any) {
            (this.socket as any).on(...arg)
        },
        useEmit(...arg:any) {
            (this.socket as any).emit(...arg)
        }
    }
})