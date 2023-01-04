/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-04 18:34:40
 * @FilePath     : /micro-vue/src/vite-env.d.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by eug yyh3531@163.com, All Rights Reserved. 
 */
/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-14 22:24:52
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-18 23:58:51
 * @FilePath: /micro-chat/src/vite-env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'socket.io-client' 
interface Window{
  __MICRO_APP_ENVIRONMENT__?:string|undefined
  __webpack_public_path__?:string|undefined
  __MICRO_APP_PUBLIC_PATH__?:string|undefined
  __MICRO_APP_BASE_ROUTE__?: string|undefined
  __MICRO_APP_NAME__?:string|undefined
  eventCenterForMicroVue?:any
  returnCitySN?:any
  ActiveXObject?: any
}

interface Navigator {
  getBattery?: Promise
}
