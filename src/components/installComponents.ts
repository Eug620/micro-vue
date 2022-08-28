/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-15 00:36:59
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-07-15 00:41:07
 * @FilePath: /micro-chat/src/components/installComponents.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {App} from 'vue'
import McContainer from './mc-container/index.vue'

export default (app: App) => {
    app.component('mc-container', McContainer)
}