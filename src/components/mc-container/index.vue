<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-15 00:34:38
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 02:33:49
 * @FilePath: /micro-chat/src/components/mc-container/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-card class="mc-container" hoverable :bordered="false" v-bind="$attrs">
    <slot />
  </a-card>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.mc-container {
  min-height: 100%;
  padding: none;
}
</style>