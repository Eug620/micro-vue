/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-14 22:43:48
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-30 18:10:13
 * @FilePath: /micro-chat/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";
import routes from './routes'
import NProgress from 'nprogress';
import { useMenus } from "@/store/modules/menus";
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

    const history = createWebHistory(`${window.__MICRO_APP_BASE_ROUTE__ || import.meta.env.VITE_BASE || ''}`)

    const router = createRouter({ history, routes })

    router.beforeEach(async (to, from, next: Function) => {
        if (!NProgress.isStarted()) {
            NProgress.start();
        }
        console.log('[Router]:beforeEach', to.name, from.name);
        // 未加载
        if (!menuStore.isLoad) {
            console.log('未加载Reload routes.....');
            let asyncRoutes: any = await menuStore.GenerateRoutes()
            const layout = routes.find(r => r.path === '/')
            layout.children = [...asyncRoutes]
            router.addRoute(layout)
            menuStore.isLoad = true
            next(to.fullPath)
        } else {
            next()
        }
    })

    router.afterEach(_ => {
        console.log('[Router]:afterEach');
        NProgress.done();
    })
    router.isReady().then(res => {
        console.log('[Router]:isReady');
    })

    return router
}