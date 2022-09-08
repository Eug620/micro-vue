/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-14 22:24:52
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-29 13:12:41
 * @FilePath: /micro-chat/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import '@/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/index.scss';
import 'nprogress/nprogress.css';

// arco-design
// import ArcoVue from '@arco-design/web-vue';
// import '@arco-design/web-vue/dist/arco.css';
// icon
// import ArcoVueIcon from '@arco-design/web-vue/es/icon';

// router
import { useInitRouter } from './router'
// import installComponents from './components/installComponents';

import i18n from '@/locales/i18n';



// store
import { pinia } from './store'


let app: any = null
let router: any = null
let history: any = null

// 将渲染操作放入 mount 函数
function mount() {
    app = createApp(App)
    app.use(i18n);
    app.use(pinia)
    // app.use(ArcoVue)
    // app.use(ArcoVueIcon)
    router = useInitRouter(app)
    console.log('取出router');
    app.use(router)
    console.log('使用router');
    app.mount('#app-vue')
    console.log('微应用micro-vue渲染了')
}

// 将卸载操作放入 unmount 函数
function unmount() {
    app?.unmount()
    history?.destroy()
    app = null
    router = null
    history = null
    console.log('微应用micro-vue卸载了')
}

// 注册了此事件说明是微前端环境，否则说明是子项目环境
if (window.eventCenterForMicroVue) {
    console.log('微前端环境');
    // window.eventCenterForMicroVue.dispatch({ callback: getLinks })
} else {
    console.log('子项目环境');
}

// 微前端环境下，注册mount和unmount方法 --- 因为禁用了沙箱所以这里失效了
if (window.__MICRO_APP_ENVIRONMENT__) {
    // @ts-ignore
    window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
    // 非微前端环境直接渲染
    mount()
}
