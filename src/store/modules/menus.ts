/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-14 23:11:02
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 07:49:14
 * @FilePath: /micro-chat/src/store/modules/menus.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { filterAsnycRouter } from '@/importRoutercom';
import { initRoutes } from '@/router/routes';
import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import { visualMenu } from '@/utils/visualMenu'
export const useMenus = defineStore({
    id: 'store-menus',
    state: () => ({
        isLoad: false,
        menu: markRaw([
            // 日志 刷新 重定向...
            
            {
                path: '/newest',
                name: 'newest',
                redirect: '',
                meta: {
                    keepAlive: true,
                    title: '实时',
                    auth: true,
                    isEle: true,
                    affix: true,
                    icon: 'IconFire'
                },
                component: 'views/newest/index'
            },
            {
                path: '/particulars/:id',
                name: 'particulars',
                redirect: '',
                meta: {
                    keepAlive: false,
                    title: '文章详情',
                    isEle: false,
                    auth: true,
                    affix: true,
                    icon: 'IconFire'
                },
                component: 'views/particulars/index'
            },
            {
                path: '/hot',
                name: 'hot',
                redirect: '',
                meta: {
                    keepAlive: true,
                    title: '热榜',
                    isEle: true,
                    auth: true,
                    affix: true,
                    icon: 'IconFire'
                },
                component: 'views/hot/index'
            },
            // 相关
            {
                path: '/about',
                name: 'about',
                redirect: '',
                meta: {
                    keepAlive: true,
                    title: '相关',
                    isEle: true,
                    auth: true,
                    affix: true,
                    icon: 'IconFaceSmileFill'
                },
                component: 'views/about/index'
            },
        ])
    }),
    getters: {
        getMenus(): RoutesConfig[] {
            return visualMenu(this.menu)
        }
    },
    actions: {
        GenerateRoutes() {
            return new Promise(resolve => {
                // 向后端请求路由数据
                let accessedRoutes = filterAsnycRouter(this.menu);
                accessedRoutes = initRoutes.concat(accessedRoutes)
                // accessedRoutes.push({ path: "*", redirect: "/404", hidden: true });
                resolve(accessedRoutes);
            });
        }
    }
})