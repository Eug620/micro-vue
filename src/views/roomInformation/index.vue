<template>
  <mc-container>
    <h1>roomInformation</h1>
    <a-input v-model="sendMessage" @press-enter="useClick">
       <template #append>
           <IconSend @click="useClick"/>
      </template></a-input>
    <p
      :class="{'the-householder': userStore.getInfo.id === message.id  }"
      v-for="(message, idx) in messageList"
      :key="idx"
    >
      {{ message.msg }}
    </p>
  </mc-container>
</template>

<script lang='ts' setup>
import { useSocketStore } from "@/store/modules/socket";
import { useUserStore } from "@/store/modules/user";
import { ref, Ref } from "vue-demi";
import { useRoute } from "vue-router";

import { IconSend } from '@arco-design/web-vue/es/icon';
const sendMessage = ref("");
const messageList: Ref<any[]> = ref([]);
const SocketStore = useSocketStore();
const userStore = useUserStore();
const router = useRoute();
const { id } = router.params;

interface MsgInterface {
  data: {
    payload: {
      message: string;
    };
  };
  meta: {
    client: string;
  };
}
SocketStore.useMonitor(id, (msg: MsgInterface) => {
  console.log("💻 :", msg);
  messageList.value.push({
    id: msg.meta.client,
    msg: `${msg.meta.client} :   ${msg.data.payload.message}`,
  });
});
const useClick = () => {
  SocketStore.useEmit("confabulate", {
    // target: "c067c55a-d3d9-4cff-b672-231b98e8ec7e",
    target: id,
    // target: 'online',
    payload: { message: sendMessage.value },
  });
  sendMessage.value = "";
};
</script>

<style lang="scss">
.the-householder{
    color: rgb(var(--primary-6));
}
</style>