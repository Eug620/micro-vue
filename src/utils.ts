/*
 * @Author       : Eug
 * @Date         : 2022-03-23 17:23:23
 * @LastEditTime: 2022-08-28 02:28:57
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /Project/test-micro/micro-vue/src/utils.ts
 */
export const submitForm = (formEl:any) => {
  if (!formEl) return
  formEl.validate((valid:any) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

export const resetForm = (formEl:any) => {
  if (!formEl) return
  formEl.resetFields()
}
