/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-25 15:05:59
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 05:36:56
 * @FilePath: /micro-base/src/plugin/transform-time/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import dayjs from 'dayjs'

export const useTransformSecond = (time?: Date | number, fomattext = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(time).format(fomattext)
}

export const useTransformDay = (time: Date, fomattext = 'YYYY-MM-DD') => {
    return dayjs(time).format(fomattext)
}
export const useTransformMonth = (time: Date, fomattext = 'YYYY-MM') => {
    return dayjs(time).format(fomattext)
}
export const useTransformYear = (time: Date, fomattext = 'YYYY') => {
    return dayjs(time).format(fomattext)
}


