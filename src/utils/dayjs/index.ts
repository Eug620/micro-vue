/* 
 * @Author       : Eug
 * @Date         : 2021-11-29 18:14:14
 * @LastEditTime: 2022-07-15 16:08:58
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /micro-vue/src/utils/dayjs/index.ts
 */
import dayjs, { ConfigType } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// import updateLocale from 'dayjs/plugin/updateLocale'
import zh from 'dayjs/locale/zh'
dayjs.extend(relativeTime)
// dayjs.extend(updateLocale)
dayjs.locale(zh)
export const FormatTimer = (time: ConfigType, fomattext = 'YYYY-MM-DD') => {
  return dayjs(time).format(fomattext)
}
export const FormatTimerSecond = (time: ConfigType, fomattext = 'YYYY-MM-DD hh:mm:ss') => {
  return dayjs(time).format(fomattext)
}

export const FormatRelativeTime = (time: ConfigType) => {
  return dayjs().to(dayjs(time))
}
export const FormatFromNow = (time: ConfigType) => {
  return dayjs(time).from(Date.now() + 1000)
}
export default {
  FormatTimer,
  FormatTimerSecond,
  FormatRelativeTime,
  FormatFromNow
}