<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-16 23:52:04
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-10-25 14:51:53
 * @FilePath     : /micro-vue/src/views/dashboard/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container class="dashboard-container">
    <div class="dashboard-container-background">
      <h3>dashboard</h3>
      {{ $t("message.hello") }}
    </div>
  </mc-container>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.dashboard-container {
  &-background {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 0);
    font-size: 200px;
    font-weight: 900;
    text-align: center;
    background: url("https://farm5.staticflickr.com/4273/34378170890_3901a0ac25_k.jpg?momo_cache_bg_uuid=99cbab77-d2d1-4c69-be97-8ba21a5eb59a")
      no-repeat center/cover;
    background-clip: text;
    -webkit-background-clip: text;
  }
}
</style>