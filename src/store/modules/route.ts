/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-09-01 16:24:15
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-01 16:30:46
 * @FilePath: /micro-vue/src/store/modules/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

export const useRouteStore = defineStore({
    id: 'route',
    state: () => ({
        router: null,
        route: null,
    }),
    getters: {
        getRoute(store: any): any {
            return store.route
        },
        getRouter(store: any): any {
            return store.router
        }
    },
    actions: {
        setRouteOptions(router: Router, route: RouteLocationNormalizedLoaded) {
            this.router = router
            this.route = route
        },
    }
})