/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-16 23:52:04
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-05-23 11:22:53
 * @FilePath     : /micro-vue/src/router/index.ts
 * @Description  : Router
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { createRouter, createWebHistory } from "vue-router";
import routes from './routes'
import NProgress from 'nprogress';
import { useMenus } from "@/store/modules/menus";
import { useUserStore } from "@/store/modules/user"
NProgress.configure({
    showSpinner: false,
    easing: 'ease',
    speed: 1000,
    minimum: 0.2,
    trickle: false,
    trickleSpeed: 800,
});
export const useInitRouter = (app: any) => {
    const menuStore = useMenus()
    const userStore = useUserStore()

    const history = createWebHistory(`${window.__MICRO_APP_BASE_ROUTE__ || import.meta.env.VITE_BASE || ''}`)

    const router = createRouter({ history, routes })

    router.beforeEach(async (to, from, next: Function) => {
        if (!NProgress.isStarted()) {
            NProgress.start();
        }
        // console.log('[Router]:beforeEach', to.name, from.name);
        if (userStore.isLogin) { // 已登陆
            if (!menuStore.isLoad) { // 已登陆-未加载路由
                let asyncRoutes: any = await menuStore.GenerateRoutes()
                const layout = routes.find(r => r.path === '/')
                layout.children = [...asyncRoutes]
                router.addRoute(layout)
                menuStore.isLoad = true
                if (to.name === 'login') {
                    next(from.path)
                } else {
                    next(to.fullPath)
                }

            } else { // 
                next()
            }
        } else {
            if (to.name !== 'login') { // 不是去login
                next({
                    name: 'login',
                    query: {
                        redirect: encodeURIComponent(to.fullPath)
                    }
                })
            } else {
                next()
            }
        }
    })

    router.afterEach(_ => {
        // console.log('[Router]:afterEach');
        NProgress.done();
    })
    // router.isReady().then(res => {
    //     console.log('[Router]:isReady');
    // })
    return router
}