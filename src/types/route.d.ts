/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-14 23:17:55
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-15 00:10:41
 * @FilePath: /micro-chat/src/types/route.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare type RoutesConfigMeta = {
    keepAlive?: boolean
    title: string
    auth: boolean
    affix: boolean
    icon: string
}
declare type RoutesConfig = {
    redirect: string
    path: string
    name: string
    meta: RoutesConfigMeta
    component: string

}