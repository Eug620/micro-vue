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
            title: '最新',
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
            title: '详情',
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
            keepAlive: false,
            title: '关于',
            isEle: true,
            auth: true,
            affix: true,
            icon: 'IconUser'
        },
        component: 'views/about/index'
    },
    {
        path: '/creative',
        name: 'creative',
        redirect: '',
        meta: {
            keepAlive: false,
            title: '创作',
            isEle: true,
            auth: true,
            affix: true,
            icon: 'IconPen'
        },
        component: 'views/creative/index'
    },
    {
        path: '/confabulate',
        name: 'confabulate',
        redirect: '',
        meta: {
            keepAlive: false,
            title: '会议',
            isEle: true,
            auth: true,
            affix: true,
            icon: 'IconWechat'
        },
        component: 'views/confabulate/index'
    },
    {
        path: '/roomInformation/:id',
        name: 'roomInformation',
        redirect: '',
        meta: {
            keepAlive: false,
            title: '房间',
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