<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-02-16 16:15:30
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
        <component
          :is="Component"
          :key="route.fullPath"
          class="animate__animated animate__fadeIn"
          v-if="!route.meta.keepAlive"
        />

        <keep-alive>
          <component
            :is="Component"
            :key="route.fullPath"
            class="animate__animated animate__fadeIn"
            v-if="route.meta.keepAlive"
          />
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

import { useMittStore } from "@/store/modules/mitt";
import { storeToRefs } from "pinia";
const isSlot = ref(null);

const mittStore = useMittStore();
const { mitt } = storeToRefs(mittStore);
mitt.value.on("setting", (v: any | undefined) => {
  isSlot.value = markRaw(v);
});

const route = useRoute();
watch(route, (v) => {
  isSlot.value = null;
});
</script>

<style lang="scss">
.chat-layout {
  height: 100vh;

  &-header {
    height: 58px;
  }

  &-container {
    padding: 10px;
    overflow-y: auto;
    position: relative;
  }
}
</style>