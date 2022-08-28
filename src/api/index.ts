/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-25 17:15:39
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 04:44:30
 * @FilePath: /micro-base/src/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const modules = import.meta.glob('./**/*.ts')

// interface ServerApiType {
//     [k:string]: (a: any) => any
// }
let ServerApi:any = {}
Object.keys(modules).forEach(v => {
    modules[v]().then((res:any) => {
        const MethodList= res.default
        Object.keys(MethodList).forEach(Api => {
            ServerApi[Api] = res.default[Api]
        })
    })
    
})

export default ServerApi