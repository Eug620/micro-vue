import { filterAsnycRouter } from '@/importRoutercom';
import { initRoutes } from '@/router/routes';
import { defineStore } from 'pinia'
import { visualMenu } from '@/utils/visualMenu'
import { useDBStore } from '@/store/modules/db';
import { DataBaseName, DATABASEPUBLIC } from '@/enums/database';
import { markRaw } from 'vue';
const customMenus = [
    // 日志 刷新 重定向...
    {
        path: '/newest',
        name: 'newest',
        redirect: '',
        meta: {
            keepAlive: true,
            title: 'newest',
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
            title: 'particulars',
            isEle: false,
            auth: true,
            affix: true,
            icon: 'IconFire'
        },
        component: 'views/particulars/index'
    },
    // {
    //     path: '/hot',
    //     name: 'hot',
    //     redirect: '',
    //     meta: {
    //         keepAlive: true,
    //         title: '热榜',
    //         isEle: true,
    //         auth: true,
    //         affix: true,
    //         icon: 'IconFire'
    //     },
    //     component: 'views/hot/index'
    // },
    // 相关
    {
        path: '/about',
        name: 'about',
        redirect: '',
        meta: {
            keepAlive: true,
            title: 'about',
            isEle: true,
            auth: true,
            affix: true,
            icon: 'IconFaceSmileFill'
        },
        component: 'views/about/index'
    },
    {
        path: '/creative-work',
        name: 'creative-work',
        redirect: '',
        meta: {
            keepAlive: true,
            title: 'creative-work',
            isEle: true,
            auth: true,
            affix: true,
            icon: 'IconFaceSmileFill'
        },
        component: 'views/creativeWork/index'
    },
    {
        path: '/confabulate',
        name: 'confabulate',
        redirect: '',
        meta: {
            keepAlive: true,
            title: 'confabulate',
            isEle: true,
            auth: true,
            affix: true,
            icon: 'IconFaceSmileFill'
        },
        component: 'views/confabulate/index'
    },
    {
        path: '/roomInformation/:id',
        name: 'roomInformation',
        redirect: '',
        meta: {
            keepAlive: false,
            title: 'roomInformation',
            isEle: false,
            auth: true,
            affix: true,
            icon: 'IconFire'
        },
        component: 'views/roomInformation/index'
    },
]
export const useMenus = defineStore({
    id: 'menus',
    state: () => ({
        isLoad: false,
        menu: <any>[]
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
                const db = useDBStore()
                const defaultConfig = db.get({ dbName: DataBaseName.SYSTEM, defaultValue: {} })
                if (!defaultConfig[DATABASEPUBLIC.ASYNCMENU]) {
                    // 本地没有菜单信息 --> 走接口获取
                    this.setMenus()
                } else {
                    // 有菜单信息 --> 走本地信息
                    this.menu = markRaw(JSON.parse(defaultConfig[DATABASEPUBLIC.ASYNCMENU]))
                }

                let accessedRoutes = filterAsnycRouter(this.menu);
                accessedRoutes = initRoutes.concat(accessedRoutes)
                // accessedRoutes.push({ path: "*", redirect: "/404", hidden: true });
                resolve(accessedRoutes);
            });
        },
        setMenus(menu: any[] = customMenus) {
            const db = useDBStore()
            this.menu = markRaw(menu) // 走接口的时候要往pinia里面存一份用作首次渲染
            db.set({ dbName: DataBaseName.SYSTEM, path: DATABASEPUBLIC.ASYNCMENU, value: JSON.stringify(menu) })
        },
    }
})