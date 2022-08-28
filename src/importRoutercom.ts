/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 01:36:16
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 02:19:14
 * @FilePath: /micro-chat/src/importRoutercom.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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

