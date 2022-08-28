/*
 * @Author       : Eug
 * @Date         : 2022-03-23 17:23:23
 * @LastEditTime : 2022-03-23 19:43:21
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /test-micro/micro-vue/src/public-path.ts
 */
if (window.__MICRO_APP_ENVIRONMENT__) {
  // eslint-disable-next-line
  window.__webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
