<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-14 23:12:31
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 07:33:54
 * @FilePath: /micro-chat/src/layout/index..vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-layout class="chat-layout">
    <a-layout-header class="chat-layout-header">
      <BaseHeaderVue />
    </a-layout-header>
    <a-layout-content class="chat-layout-container">
      <router-view v-slot="{ Component, route }">
        <keep-alive v-show="route.meta.keepAlive">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
      </router-view>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
// import { IconSync } from "@arco-design/web-vue/es/icon";
import BaseHeaderVue from "./BaseHeader.vue";
</script>

<style lang="scss">
.chat-layout {
  height: 100vh;
  background-color: rgb(var(--gray-2));
  color: rgb(var(--gray-10));

  &-container {
    padding: 10px;
    overflow: scroll;
  }
}
</style>