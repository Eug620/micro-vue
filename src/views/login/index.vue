<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : Eug yyh3531@163.com
 * @LastEditTime : 2023-02-24 22:14:17
 * @FilePath     : \micro-vue\src\views\login\index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <div class="chat-login">
    <!-- <a-card title="Eug" class="!absolute w-full h-full sm:w-full sm:h-full md:w-1/2 md:h-auto lg:h-auto lg:w-1/4  top-0 right-0 sm:top-1/4 md:top1/4 sm:right-1/4 md:right-1/4"> -->
    <a-card title="Eug" class="chat-login-container">
      <template #extra>
        <a-radio-group v-model="position" type="button">
          <a-radio value="SignIn">{{ $t('button.signIn') }}</a-radio>
          <a-radio value="SignUp">{{ $t('button.signUp') }}</a-radio>
        </a-radio-group>
      </template>
      <base-sign-form v-model:type="position" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const position = ref('SignIn');
const isInfoEdit = ref(false)
</script>

<style lang="scss">
.chat-login {
  height: 100vh;
  width: 100vw;
  background-color: rgb(var(--gray-2));
  color: rgb(var(--gray-10));
  padding: 10px;
  box-sizing: border-box;
  position: relative;

  @media (min-width: 640px) {
    .chat-login-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }
  }

  @media(min-width: 1024px) {
    .chat-login-container {
      position: absolute;
      top: 30%;
      left: 70%;
      width: 30%;
      transform: translate(-50%, -50%);
      height: auto;
    }
  }
}
</style>