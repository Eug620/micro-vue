<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-09-22 18:46:17
 * @FilePath     : /micro-vue/src/views/roomInformation/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container>
    <h1>{{ comRenderInfo.name }}</h1>
    <p>{{ comRenderInfo.describe }}</p>
    <a-input v-model="sendMessage" @press-enter="useClick">
      <template #append> <IconSend @click="useClick" /> </template
    ></a-input>
    <a-timeline :reverse="false">
      <a-timeline-item
        :label="useTransformSecond(message.timestamp)"
        :class="{ 'the-householder': userStore.getInfo.id === message.id }"
        v-for="(message, idx) in comRenderMessage"
        :key="idx"
      >
        {{ message.name }}: {{ message.message }}</a-timeline-item
      >
    </a-timeline>
  </mc-container>
</template>

<script lang='ts' setup>
import { useSocketStore } from "@/store/modules/socket";
import { useUserStore } from "@/store/modules/user";
import { computed, ref, Ref } from "vue-demi";
import { useRoute } from "vue-router";
import { useTransformSecond } from "@/plugin/transform-time";

import { IconSend } from "@arco-design/web-vue/es/icon";
const sendMessage = ref("");
const messageList: Ref<any[]> = ref([]);
const SocketStore = useSocketStore();
const userStore = useUserStore();
const router = useRoute();
const { id }: any = router.params;

const comRenderMessage = computed(() => {
  return SocketStore.useGetRoomMessageList(id);
});
const comRenderInfo = computed(() => {
  return SocketStore.useGetRoomInfo(id);
});

SocketStore.useResetRoomCount(id);
const useClick = () => {
  SocketStore.useEmitRoomMessage(id, sendMessage.value);
  sendMessage.value = "";
};
</script>

<style lang="scss">
.the-householder {
  color: rgb(var(--primary-6));
}
</style>