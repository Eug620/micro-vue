/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-25 17:15:39
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-30 18:05:16
 * @FilePath: /micro-base/src/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const modules = import.meta.glob('./**/*.ts', { eager: true, import: 'default' })
let ServerApi: any = {}
// 注册API
const useDeepApi = (modules: any, key: string = '') => {
    // Object的话进去递归
    if (Object.prototype.toString.call(modules) === '[object Object]') {
        for (const _module in modules) {
            useDeepApi(modules[_module], _module)
        }
    } else if (Object.prototype.toString.call(modules) === '[object Function]') {
        // 函数的话就是所需要的接口函数
        ServerApi[key] = modules
    } else {
        console.warn(`useDeepApi: [${key} : ${modules}] Error of the data type`)
    }

}
useDeepApi(modules)

export default ServerApi