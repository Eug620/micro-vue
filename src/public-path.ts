/*
 * @Author       : Eug
 * @Date         : 2022-03-23 17:23:23
 * @LastEditTime: 2022-08-28 19:39:39
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /test-micro/micro-vue/src/public-path.ts
 */
if (window.__MICRO_APP_ENVIRONMENT__) {
  // eslint-disable-next-line
  window.__webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
export default{}