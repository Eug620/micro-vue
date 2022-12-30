<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-12-30 16:45:59
 * @FilePath     : /micro-vue/src/layout/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <a-layout class="chat-layout">
    <a-layout-header class="chat-layout-header">
      <BaseHeaderVue />
    </a-layout-header>
    <a-layout-content class="chat-layout-container">
      <router-view v-slot="{ Component, route }">
        <div
          v-if="!route.meta.keepAlive"
          class="animate__animated animate__fadeIn"
        >
          <component @setting="useSetting" :is="Component" :key="route.fullPath" />
        </div>
        <keep-alive v-if="route.meta.keepAlive">
        <div class="animate__animated animate__fadeIn">
          <component
            :is="Component"
            :key="route.fullPath"
            @setting="useSetting"
          />
        </div>
        </keep-alive>
      </router-view>
    </a-layout-content>
  </a-layout>
  <mc-setting>
    <component :is="isSlot"></component>
  </mc-setting>
</template>

<script lang="ts" setup>
// import { IconSync } from "@arco-design/web-vue/es/icon";
import { markRaw, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BaseHeaderVue from "./BaseHeader.vue";
const isSlot = ref(null)
const useSetting = (v:any) => {
  isSlot.value = markRaw(v)
}
const route = useRoute()
watch(route,
  (v) => {
    isSlot.value = null
  }
)

</script>

<style lang="scss">
.chat-layout {
  height: 100vh;

  &-header{
    height: 58px;
  }

  &-container {
    padding: 10px;
    overflow: scroll;
  }
}
</style>