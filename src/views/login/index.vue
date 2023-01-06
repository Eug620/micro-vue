<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-10-21 18:36:28
 * @FilePath     : /micro-vue/src/views/login/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <div class="chat-login">
    <a-card title="User" class="chat-login-container">
      <template #extra>
        <a-radio-group v-model="position" type="button">
          <a-radio value="SignIn">Sign in</a-radio>
          <a-radio value="SignUp">Sign up</a-radio>
        </a-radio-group>
      </template>
      <base-sign-form v-model:type="position"/>
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
.chat-login{
  height: 100vh;
  width: 100vw;
  background-color: rgb(var(--gray-2));
  color: rgb(var(--gray-10));
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  &-container{
    position: absolute;
    top: 30%;
    left: 70%;
    width: 30%;
    transform: translate(-50%, -50%);
  }
}
</style>