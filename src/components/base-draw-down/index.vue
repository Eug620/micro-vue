<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-19 00:53:00
 * @FilePath     : /micro-vue/src/components/base-draw-down/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2023 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <a-button shape="round" type="primary" status="danger" @click="useDrawDown">Draw down</a-button>
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