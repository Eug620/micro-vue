<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-07-20 16:46:48
 * @FilePath     : /micro-vue/src/components/mc-container/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <a-card class="mc-container" hoverable :bordered="false" v-bind="$attrs">
    <template #title>
      <slot name="mc-title"/>
    </template>

    <template #extra>
      <slot name="mc-extra"/>
    </template>
    <template #cover>
      <slot name="mc-cover"/>
    </template>
    <template #actions>
      <slot name="mc-actions"/>
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