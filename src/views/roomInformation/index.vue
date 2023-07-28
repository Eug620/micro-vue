<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-07-28 11:45:09
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
          <a-comment v-for="(message, idx) in comRenderMessage" class="animate__fadeIn  animate__animated"
            :id="`id_${idx}`" :key="idx" :author="message.name" :datetime="useTransformSecond(message.timestamp)">
            <template #content>
              <p v-html="message.message"></p>
            </template>
            <template #avatar>
              <a-avatar :imageUrl="message.avatar" />
            </template>
          </a-comment>
        </div>
        <div v-if="false" class="roomInformation-container-list-user">
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
      <div class="roomInformation-container-info animate__fadeIn  animate__animated" @click="userDrawer = !userDrawer"
        v-if="!userDrawer">
        <div class="roomInformation-container-info-content">
          <IconLeftCircle size="20" style="color:rgb(var(--primary-6))" />
        </div>
      </div>
      <a-drawer class="animate__fadeIn  animate__animated" :footer="false" width="100%"
        popup-container=".roomInformation-container-list" :visible="userDrawer" @ok="userDrawer = false"
        @cancel="userDrawer = false" unmountOnClose>
        <template #title> 成员 </template>
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
      </a-drawer>
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

import { IconSend, IconLink, IconUser, IconDelete, IconStop, IconLeftCircle } from "@arco-design/web-vue/es/icon";
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

const userDrawer = ref(false)

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
  if (SocketStore.rooms[id]) {
      SocketStore.rooms[id]['messageCount'] = 0
      SocketStore.useSetMessageLen(id)
  }
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
    position: relative;
    overflow: hidden;


    &-list {
      flex: 1;
      overflow-y: hidden;
      display: flex;
      position: relative;
      overflow-x: hidden;

      &-comment {
        padding-top: 16px;
        flex: 1;
        overflow-y: auto;
      }

      &-user {

        // padding: 16px 0;
        // border-left: 1px solid var(--color-fill-2);
        @keyframes RangeColor {
          0% {
            // transform: translateX(0);
            transition: all 1s linear;
            background-color: #00ffff;
          }

          25% {
            // transform: translateX(-25%);
            transition: all 1s linear;
            background-color: #ff1493;
          }

          75% {
            // transform: translateX(-50%);
            transition: all 1s linear;
            background-color: #006699;
          }

          100% {
            // transform: translateX(-75%);
            transition: all 1s linear;
            background-color: #00ffff;
          }
        }

        .user-online {
          // background-image: linear-gradient(to left, rgba(0, 0, 0, 0), rgb(var(--arcoblue-2)), rgba(0, 0, 0, 0), rgb(var(--arcoblue-2)), rgba(0, 0, 0, 0));
          // background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0), rgb(var(--arcoblue-2)), rgba(0, 0, 0, 0), rgb(var(--arcoblue-2)), rgba(0, 0, 0, 0));
          color: rgb(var(--primary-6));
          // font-weight: bold;
          cursor: pointer;
          // position: relative;


          // background: linear-gradient(135deg, #496eaa, #944fa8, #a8804f, #944fa8, #496eaa);
          // background-size: 700% 150%;
          // animation: dynamics 5s ease infinite;
          // -webkit-animation: dynamics 5s ease infinite;
          // -moz-animation: dynamics 5s ease infinite;

        }

        @keyframes dynamics {
          0% {
            background-position: 0% 0%;
          }

          50% {
            background-position: 50% 100%;
          }

          100% {
            background-position: 100% 0%;
          }
        }


        .user-outline {
          color: var(--color-text-4);
          // font-weight: bold;
          // background-color: var(--color-fill-2);
          cursor: not-allowed;
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

    &-info {
      padding: .5rem;
      position: absolute;
      top: 0;
      right: 1rem;
      overflow: hidden;
      // background-color: #ccc;
      cursor: pointer;


      &-content {
        // position: absolute;
        // top: 0;
        // right: 0;
        // padding: .5rem;
        // border-radius: 50%;
        // transform: translateX(2rem);
        // background-color: rgb(var(--gray-4));
        // transform: translateX(100%);
        // cursor: pointer;
        // transition: all .5s;
      }

      &:hover &-content {
        transform: translate(0);
        transition: all .5s;
      }
    }
  }
}
</style>