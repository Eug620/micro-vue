/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-27 00:22:07
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 19:34:23
 * @FilePath: /micro-base/src/store/modules/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia';
import { useDBStore } from '@/store/modules/db'
import { DataBaseName } from '@/enums/database';
import ServerApi from '@/api';
import { Notification } from '@arco-design/web-vue';
export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        isLogin: false,
        info: null
    }),
    getters: {
        getToken(store:any):any {
            return store.info?.token
        },
        getInfo(store:any):any {
            return store.info || {}
        }
    },
    actions: {
        logout() {
            this.setInfo({})
        },
        login(params?:any) {
            return new Promise(async (resolove, reject) => {
                try {
                    let res: any = await ServerApi.UserLogin(params);
                    if (res.data) {
                        this.setInfo({ ...res.data, token: res.token })
                        resolove(res)
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
        load() {
            const db = useDBStore()
            this.info = db.get({
                dbName: DataBaseName.SYSTEM,
                path: 'info',
                defaultValue: {},
                user: true,
            })
            this.isLogin = this.info?.token ? true : false
        },
        setInfo(info?:any) {
            const db = useDBStore()
            this.info = info
            this.isLogin = this.info?.token ? true : false
            db.set({
                dbName: DataBaseName.SYSTEM,
                path: 'info',
                value: info,
                user: true,
            })
        }
    }
})