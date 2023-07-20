<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-07-20 18:07:42
 * @FilePath     : /micro-vue/src/components/mc-container/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <a-card class="mc-container" hoverable :bordered="false" v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <slot />
  </a-card>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.mc-container {
  min-height: calc(100vh - 78px);
  padding: none;
}
</style>