/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 07:42:39
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 07:50:12
 * @FilePath: /micro-chat/src/utils/visualMenu.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


export const visualMenu = (asyncMenu:any[]) => {
    return asyncMenu.filter(menu => {
        if (menu.children && menu.children.length) {
            menu.children = visualMenu(menu.children)
        }
        return menu.meta.isEle
    })
}

