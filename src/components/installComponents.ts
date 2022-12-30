/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-12-30 15:40:20
 * @FilePath     : /micro-vue/src/components/installComponents.ts
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */
import { App } from 'vue'
import McContainer from './mc-container/index.vue'
import McSetting from './mc-setting/index.vue'

export default (app: App) => {
    app.component('mc-container', McContainer)
    app.component('mc-setting', McSetting)
}