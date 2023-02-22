<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-02-22 18:25:06
 * @FilePath     : /micro-vue/src/layout/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <a-layout class="chat-layout">
    <a-layout-header class="chat-layout-header">
      <BaseHeaderVue @on-route-change="useRouterChange" />
    </a-layout-header>
    <a-layout-content class="chat-layout-container">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" class="animate__animated animate__fadeIn"
          v-if="!route.meta.keepAlive" />

        <keep-alive>
          <component :is="Component" :key="route.fullPath" class="animate__animated animate__fadeIn"
            v-if="route.meta.keepAlive" />
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
import { markRaw, ref, watch, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseHeaderVue from "./BaseHeader.vue";

import { Notification } from '@arco-design/web-vue'
import i18n from '@/locales/i18n';

import { useMittStore } from "@/store/modules/mitt";
import { storeToRefs } from "pinia";
const isSlot = ref(null);

const mittStore = useMittStore();
const { mitt } = storeToRefs(mittStore);
mitt.value.on("setting", (v: any | undefined) => {
  isSlot.value = markRaw(v);
});

const route = useRoute();
const router = useRouter()
watch(route, (v) => {
  isSlot.value = null;
});
const useRouterChange = (name: string) => {
  console.log('useRouterChange', name);
  router.push({ name })
}
const kindlyReminder = () => {
  return h('div', [
    h('div', [
      h('strong', { class: 'kindly-reminder-label' }, 'Window'),
      h('span', ':'),
      h('span', { class: 'kindly-reminder-text' }, 'ctrl + alt + T')
    ]),
    h('div', [
      h('strong', { class: 'kindly-reminder-label' }, 'Mac:'),
      h('span', ':'),
      h('span', { class: 'kindly-reminder-text' }, 'control + option + T')
    ]),
    h('div', { class: 'kindly-reminder-desc' }, i18n.global.t(`pages.layout.kindlyReminderDesc`)),
  ])
}
Notification.info({
  title: () => i18n.global.t(`pages.layout.kindlyReminder`),
  content: kindlyReminder,
  duration: 5000,
  showIcon: false,
  position: 'bottomRight'
})

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

.kindly-reminder {
  &-label {
    width: 60px;
    margin-left: 20px;
    display: inline-block;
    margin-top: 6px;
  }

  &-text {
    padding-left: 6px;
    margin-top: 6px;
    font-weight: bold;
  }

  &-desc{
    margin-top: 6px;
    margin-left: 20px;

  }
}
</style>