<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-09-18 05:33:53
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-18 23:45:25
 * @FilePath: /micro-vue/src/views/confabulate/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <mc-container>
    <h3>当前发送对象: {{ activeTo ? activeTo:  '广播'  }}</h3>
    <a-button @click="() => activeTo = ''">切换为广播</a-button>
    <a-input v-model="sendMessage"></a-input>
    <a-button @click="useClick">发送</a-button>
    <p v-for="(message,idx) in messageList" :key="idx" @click="useClient(message)">[点击发送给此人]{{ message.msg }}</p>
  </mc-container>
</template>

<script setup lang="ts">
import ServerApi from "@/api";
import { useSocketStore } from "@/store/modules/socket";
import { useUserStore } from "@/store/modules/user";
import { Ref, ref } from "vue-demi";
const SocketStore = useSocketStore();
const userStore = useUserStore();
const sendMessage = ref('');
const messageList:Ref<any[]> = ref([]);
const activeTo = ref('')

const baseTarge = 'rooms'

const useClient = (v:any) => {
    activeTo.value = v.id
}

interface MsgInterface {
    data: {
        payload: {
            message: string
        }
    }
    meta: {
        client: string
    }
}
SocketStore.useMonitor(baseTarge, (msg: MsgInterface) => {
  console.log("🪧 :", msg);
  messageList.value.push({
    id: msg.meta.client,
    msg: `${msg.meta.client}:${msg.data.payload.message}`
  })
});
SocketStore.useMonitor(userStore.getInfo.id, (msg: MsgInterface) => {
  console.log("💻 :", msg);
  messageList.value.push({
    id: msg.meta.client,
    msg: `${msg.meta.client}:${msg.data.payload.message}`
  })
});

SocketStore.useMonitor('online', (msg: any) => {
  console.log("🔗 :", msg);
});

const useClick = () => {
//     messageList.value.push({
//     id: userStore.getInfo.id,
//     msg: `${userStore.getInfo.id}:${sendMessage.value}`
//   })
    SocketStore.useEmit("confabulate", {
    // target: "c067c55a-d3d9-4cff-b672-231b98e8ec7e",
    target: activeTo.value || baseTarge,
    // target: 'online',
    payload: { message: sendMessage.value },
  });
};
</script>

<style lang="scss">
</style>