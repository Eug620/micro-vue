/* 
 * @Author       : Eug
 * @Date         : 2021-11-29 18:14:14
 * @LastEditTime: 2022-07-15 16:08:58
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /chat/src/utils/dayjs/index.js
 */
import dayjs, { ConfigType } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// import updateLocale from 'dayjs/plugin/updateLocale'
import zh from 'dayjs/locale/zh'
dayjs.extend(relativeTime)
// dayjs.extend(updateLocale)
dayjs.locale(zh)
const FormatTimer = (time: ConfigType, fomattext = 'YYYY-MM-DD') => {
  return dayjs(time).format(fomattext)
}
const FormatTimerSecond = (time: ConfigType, fomattext = 'YYYY-MM-DD hh:mm:ss') => {
  return dayjs(time).format(fomattext)
}

const FormatRelativeTime = (time: ConfigType) => {
  return dayjs().to(dayjs(time))
}
export default {
  FormatTimer,
  FormatTimerSecond,
  FormatRelativeTime
}