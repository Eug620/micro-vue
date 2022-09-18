/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-14 22:56:39
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-18 05:37:16
 * @FilePath: /micro-chat/src/router/routes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IconHome } from '@arco-design/web-vue/es/icon'
export const initRoutes = [
    // 首页
    {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
            keepAlive: false,
            title: 'dashboard',
            auth: true,
            affix: true,
            icon: IconHome
        },
        component: () => import('@/views/dashboard/index.vue')
    },
]


export const frameLogin = [
    // 首页
     {
        path: '/login',
        name: 'login',
        meta: {
            keepAlive: false,
            title: '登陆',
            auth: true,
            affix: true,
            icon: IconHome
        },
        component: () => import('@/views/login/index.vue')
    },
]
export const frameIn:any[] = [
    {
        path: '/',
        redirect: { name: 'dashboard' },
        component: () => import('@/layout/index.vue'),
        children: [
            ...initRoutes,
        ]
    }
]

export const errorPage = [
    { path: '/:pathMatch(.*)*', name: '404', component: () => import('@/views/NotFound/index.vue') }
]
export default [
    ...frameIn,
    // ...frameOut,
    ...frameLogin,
    ...errorPage,
]