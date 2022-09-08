/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-14 22:43:48
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-01 17:21:27
 * @FilePath: /micro-chat/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";
import routes from './routes'
import NProgress from 'nprogress';
import { useMenus } from "@/store/modules/menus";
import { useUserStore } from "@/store/modules/user"
NProgress.configure({
    showSpinner: false,
    easing: 'linear',
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
        if (!NProgress.isStarted() && !window.eventCenterForMicroVue) {
            NProgress.start();
        }
        console.log('[Router]:beforeEach', to.name, from.name);
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
        console.log('[Router]:afterEach');
        if (!window.eventCenterForMicroVue) {
            NProgress.done();
        }
    })
    router.isReady().then(res => {
        console.log('[Router]:isReady');
    })

    return router
}