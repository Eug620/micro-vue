<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-10-26 14:45:23
 * @FilePath     : /micro-vue/src/views/roomInformation/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container :title="comRenderInfo?.name" :extra="comRenderInfo?.describe">
    <div class="roomInformation-container">
      <div class="roomInformation-container-list">
        <a-comment
          v-for="(message, idx) in comRenderMessage"
          :key="idx"
          :author="message.name"
          :datetime="useTransformSecond(message.timestamp)"
        >
        <template #content>
          <p v-html="message.message"></p>
        </template>
          <template #avatar>
            <a-avatar>
              <img
                alt="avatar"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
              />
            </a-avatar>
          </template>
        </a-comment>
      </div>
      <div class="roomInformation-container-footer">
        <!-- <a-input v-model="sendMessage" @press-enter="useClick" >
          <template #append>
            <IconSend @click="useClick" />
          </template>
        </a-input> -->
        <a-textarea placeholder="Please enter something" v-model="sendMessage" allow-clear/>
        <a-button @click="useClick">send</a-button>
      </div>
    </div>
  </mc-container>
</template>

<script lang='ts' setup>
import { useSocketStore } from "@/store/modules/socket";
// import { useSocketStore } from "@/store/modules/resetSocket";
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
const useClose = () => {
  SocketStore.socket.close();
};
</script>

<style lang="scss">
.the-householder {
  color: rgb(var(--primary-6));
}
.roomInformation-container {
  width: 100%;
  height: calc(100vh - 78px - 46px - 32px);
  display: flex;
  flex-direction: column;

  &-list {
    flex: 1;
    overflow: scroll;
  }

  &-footer {
    height: 30%;
    // border-top: 1px solid var(--color-neutral-3);
    display: flex;
    .arco-btn{
      height: 100%;
    }
  }
}
</style>