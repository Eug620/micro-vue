/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-27 00:22:07
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-01 17:16:39
 * @FilePath: /micro-base/src/store/modules/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore, storeToRefs } from 'pinia';
import { useDBStore } from '@/store/modules/db'
import { DataBaseName, DATABASEPUBLIC } from '@/enums/database';
import ServerApi from '@/api';
import { Notification } from '@arco-design/web-vue';
import { useRouteStore } from '@/store/modules/route'
import { useSocketStore } from '@/store/modules/socket'
// import { useSocketStore } from '@/store/modules/resetSocket'


export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        isLogin: false,
        info: null,
        visitorInfo: null,
    }),
    getters: {
        getRouteOptions(store: any): any {
            return {
                router: store.router,
                route: store.route
            }
        },
        getToken(store: any): any {
            return store.info?.token
        },
        getInfo(store: any): any {
            return store.info || {}
        }
    },
    actions: {
        logout() {
            const { getRouter } = storeToRefs(useRouteStore())
            this.setInfo({})
            getRouter.value.push({
                name: 'login'
            })
            this.removeSocket()
        },
        login(params?: any) {
            return new Promise(async (resolove, reject) => {
                try {
                    let res: any = await ServerApi.UserLogin(params);
                    if (res.data) {
                        this.setInfo({ ...res.data, token: res.token })
                        resolove(res)
                        this.reloadSocket()
                        this.getVisitorInfo(true)
                    } else {
                        Notification.error({
                            title: 'Login',
                            content: res.msg,
                        });
                        reject(res)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        },
        reload() {
            const db = useDBStore()
            this.info = db.get({
                dbName: DataBaseName.SYSTEM,
                path: 'info',
                defaultValue: {},
                user: true,
            })
            this.isLogin = this.info?.token ? true : false
            if (this.isLogin) {
                this.reloadSocket()
                this.getVisitorInfo()
            }
        },
        reloadSocket() {
            // websocket
            const socketStore = useSocketStore()
            // socketStore.initSocket()
            socketStore.useGetRoomsOwn()
        },
        async getVisitorInfo(status: boolean = false) {
            try {
                let res = await ServerApi.VisitorInfo()
                this.visitorInfo = res
                if (status) ServerApi.VisitorInfoAdd(res)
                // ServerApi.VisitorInfoIndex()
                // ServerApi.VisitorInfoAll()
            } catch (err) {
                console.log(err);
            }
        },
        removeSocket() {
            // websocket
            const socketStore = useSocketStore()
            socketStore.closeSocket()
        },
        setInfo(info?: any) {
            const db = useDBStore()
            this.info = info
            this.isLogin = this.info?.token ? true : false
            !this.isLogin && db.set({ dbName: DataBaseName.SYSTEM, path: DATABASEPUBLIC.ASYNCMENU, value: null })
            db.set({
                dbName: DataBaseName.SYSTEM,
                path: 'info',
                value: info,
                user: true,
            })
        }
    }
})