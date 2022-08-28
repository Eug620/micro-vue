<template>
  <a-button type="primary" status="danger" @click="useDrawDown">Draw down</a-button>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import ServerApi from '@/api';
import { Notification } from '@arco-design/web-vue';

import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { getInfo } = storeToRefs(userStore);

const signInForm = reactive({
  name: '',
  password: '',
});


const useDrawDown = async () => {
  try {
    let res:any = await ServerApi.UserDelete({
      id: getInfo.value.id,
    });
    if (res.code === 200) {
      userStore.logout()
      Notification.success({
        title: 'Success',
        content: 'Draw down',
      });
    } else {
    }
  } catch (error) {}
};

</script>

<style>
</style>