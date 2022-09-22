<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-09-22 11:46:29
 * @FilePath     : /micro-vue/src/views/roomInformation/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container>
    <h1>roomInformation</h1>
    <a-input v-model="sendMessage" @press-enter="useClick">
       <template #append>
           <IconSend @click="useClick"/>
      </template></a-input>
    <p
      :class="{'the-householder': userStore.getInfo.id === message.id  }"
      v-for="(message, idx) in comRenderMessage"
      :key="idx"
    >
      {{ message.message }}
    </p>
  </mc-container>
</template>

<script lang='ts' setup>
import { useSocketStore } from "@/store/modules/socket";
import { useUserStore } from "@/store/modules/user";
import { computed, ref, Ref } from "vue-demi";
import { useRoute } from "vue-router";

import { IconSend } from '@arco-design/web-vue/es/icon';
const sendMessage = ref("");
const messageList: Ref<any[]> = ref([]);
const SocketStore = useSocketStore();
const userStore = useUserStore();
const router = useRoute();
const { id }: any = router.params;

const comRenderMessage = computed(() => {
  return SocketStore.useGetRoomMessageList(id)
})
SocketStore.useResetRoomCount(id)
const useClick = () => {
  SocketStore.useEmitRoomMessage(id, sendMessage.value );
  sendMessage.value = "";
};
</script>

<style lang="scss">
.the-householder{
    color: rgb(var(--primary-6));
}
</style>