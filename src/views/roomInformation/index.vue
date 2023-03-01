<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-01 18:27:42
 * @FilePath     : /micro-vue/src/views/roomInformation/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container :title="comRenderInfo?.name || '无效的房间'" :extra="comRenderInfo?.describe" class="roomInformation">
    <div class="roomInformation-container">
      <div class="roomInformation-container-list">
        <div class="roomInformation-container-list-comment">
          <a-comment v-for="(message, idx) in comRenderMessage" :id="`id_${idx}`" :key="idx" :author="message.name"
            :datetime="useTransformSecond(message.timestamp)">
            <template #content>
              <p v-html="message.message"></p>
            </template>
            <template #avatar>
              <a-avatar :imageUrl="message.avatar" />
            </template>
          </a-comment>
        </div>
        <div class="roomInformation-container-list-user">
          <a-list :bordered="false">
            <a-list-item v-for="([id, info], idx) in useOnlineInfo" :key="id"
              :class="[info.isOnline ? 'user-online' : 'user-outline']">
              <a-row align="center">
                <a-col flex="24px">
                  <IconUser v-if="info.id === comRenderInfo?.author" />
                  <IconLink v-else-if="info.isOnline" />
                  <IconStop v-else />
                </a-col>
                <a-col flex="28px">
                  <a-avatar :size="20" :imageUrl="info.avatar" />
                </a-col>
                <a-col flex="auto">
                  {{ info.name }}
                </a-col>
                <a-col flex="30px">
                  <IconDelete @click="useDeleteUser(info.id)" :style="{ color: 'rgb(var(--red-6))', cursor: 'pointer' }"
                    v-if="info.id !== comRenderInfo?.author && userStore.getInfo.id === comRenderInfo?.author" />
                </a-col>
              </a-row>
            </a-list-item>
          </a-list>
          <a-space direction="vertical" fill v-if="false">
            <!-- {{ userStore.getInfo.id }} -->
            <span v-for="([id, info], idx) in useOnlineInfo" :key="id"
              :class="[info.isOnline ? 'user-online' : 'user-outline']">
              <a-row align="center">
                <a-col flex="30px">
                  <IconUser v-if="info.id === comRenderInfo?.author" />
                  <IconLink v-else-if="info.isOnline" />
                  <IconStop v-else />
                </a-col>
                <a-col flex="auto">
                  {{ info.name }}
                </a-col>
                <a-col flex="30px">
                  <IconDelete @click="useDeleteUser(info.id)" :style="{ color: 'rgb(var(--red-6))', cursor: 'pointer' }"
                  v-if="info.id !== comRenderInfo?.author && userStore.getInfo.id === comRenderInfo?.author" />
              </a-col>
            </a-row>
            <!-- <a-divider :margin="10" :type="'dashed'" v-if="idx !== (useOnlineInfo.size -1 )"/> -->
            </span>
          </a-space>
        </div>
      </div>
      <div class="roomInformation-container-footer">
        <!-- <a-input v-model="sendMessage" @press-enter="useClick" >
                  <template #append>
                    <IconSend @click="useClick" />
                  </template>
                </a-input> -->
        <!-- <a-textarea placeholder="Please enter something" v-model="sendMessage" allow-clear /> -->
        <a-input placeholder="Please enter something" @press-enter="usePressEnter" v-model="sendMessage" allow-clear />
        <a-button :disabled="!sendMessage || !comRenderInfo" @click="useClick">
          <IconSend />
        </a-button>
      </div>
    </div>
  </mc-container>
</template>

<script lang='ts' setup>
import { useSocketStore } from "@/store/modules/socket";
// import { useSocketStore } from "@/store/modules/resetSocket";
import { useUserStore } from "@/store/modules/user";
import { computed, ref, Ref, nextTick, watchEffect } from "vue-demi";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useTransformSecond } from "@/plugin/transform-time";

import { IconSend, IconLink, IconUser, IconDelete, IconStop } from "@arco-design/web-vue/es/icon";
import ServerApi from "@/api";
const sendMessage = ref("");
const messageList: Ref<any[]> = ref([]);
const SocketStore = useSocketStore();
const userStore = useUserStore();
const router = useRoute();
const { id }: any = router.params;

const comRenderMessage = computed(() => {
  return SocketStore.useGetRoomMessageList(id);
});

watchEffect(() => {
  if (!comRenderMessage.value || !comRenderMessage.value?.length) return
  nextTick(() => {
    const endID = comRenderMessage.value.length - 1
    const news: any = document.querySelector(`#id_${endID}`)
    news?.scrollIntoView({
      behavior: 'smooth'
    });
  })
})

const comRenderInfo = computed(() => {
  return SocketStore.useGetRoomInfo(id);
});

SocketStore.useResetRoomCount(id);
const useClick = () => {
  SocketStore.useEmitRoomMessage(id, sendMessage.value);
  sendMessage.value = "";
};
const usePressEnter = () => {
  if (!sendMessage.value || !comRenderInfo.value) return
  useClick()
}
const useClose = () => {
  SocketStore.socket.close();
};
onBeforeRouteLeave(() => {
  if (SocketStore.rooms[id]) SocketStore.rooms[id]['messageCount'] = 0
})
const useOnlineInfo = computed(() => {
  return SocketStore.useGetOnlineInfo(id) || new Map()
})
const useDeleteUser = async (user_id: string) => {
  try {
    await ServerApi.RoomsDeleteUser({ user_id, room_id: id })
  } catch (err) {

  }
}
</script>

<style lang="scss">
.the-householder {
  color: rgb(var(--primary-6));
}

.roomInformation {

  .arco-card-body {
    padding-top: 0;
  }

  &-container {
    width: 100%;
    height: calc(100vh - 78px - 46px - 32px);
    display: flex;
    flex-direction: column;


    &-list {
      flex: 1;
      overflow-y: hidden;
      display: flex;

      &-comment {
        padding-top: 16px;
        flex: 1;
        overflow-y: auto;
      }

      &-user {
        width: 20%;
        padding: 16px;
        border-left: 1px solid var(--color-fill-2);

        .user-online {
          color: rgb(var(--primary-6));
        }

        .user-outline {
          color: rgb(var(--primary-3));
        }
      }
    }

    &-footer {
      height: 8%;
      min-height: 50px;
      max-height: 80px;
      // border-top: 1px solid var(--color-neutral-3);
      display: flex;

      .arco-btn {
        height: 100%;
      }
    }
  }
}
</style>