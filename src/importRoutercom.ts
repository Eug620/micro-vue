/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-12-30 17:43:59
 * @FilePath     : /micro-vue/src/importRoutercom.ts
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */
export function filterAsnycRouter(asyncRouterMap: any) {
    return asyncRouterMap.filter((route: any) => {
        if (route.component == 'Layout') {
            route.component = () => import('./layout/index.vue')
        } else {
            route.path = `${route.path}`
            route.component = resolveComponent(route.component);
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsnycRouter(route.children);
        }
        return true;
    })
}

const pages = import.meta.glob('./views/**/*.vue', { eager: true });
// 以 `./` 开头）或绝对路径（以 `/` 开头

const resolveComponent = (name: any) => {
    const importPage:any = pages[`./${name}.vue`];

    if (!importPage) {
        throw new Error(`Unknown page ${name}. Is it located under Pages with a .vue extension?`);
    }

    // return importPage().then(module => module.default);
    return importPage.default
}

