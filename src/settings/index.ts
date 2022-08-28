/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-25 15:18:23
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-25 17:24:19
 * @FilePath: /micro-base/src/settings/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
interface InterAPISERVICEENUM  {
    [key: string]: any
}
export const API_SERVICE_ENUM: InterAPISERVICEENUM = {
    base: import.meta.env.VITE_APP_BASE_API,
}