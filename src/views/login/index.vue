<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-06-26 13:25:10
 * @FilePath     : /micro-vue/src/views/login/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <div class="chat-login">
    <div class="fixed right-0 bottom-0 cursor-pointer">
      <Vue3Lottie v-if="isShow" @click="useRandom" key="lottieIdx" :animationData="lottieList[lottieIdx]" :height="100"
        :width="100" />
    </div>

    <!-- <a-card title="Eug" class="!absolute w-full h-full sm:w-full sm:h-full md:w-1/2 md:h-auto lg:h-auto lg:w-1/4  top-0 right-0 sm:top-1/4 md:top1/4 sm:right-1/4 md:right-1/4"> -->
    <a-card class="chat-login-container">
      <template #title>
        <BaseIconFont type="eug-icon-notebook" :size="24" />
      </template>
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
import { ref, nextTick, unref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import BaseIconFont from '@/components/base-icon-font';
import CarA from '@/assets/lottie/car-A.json'
import CarB from '@/assets/lottie/car-B.json'
import CarC from '@/assets/lottie/car-C.json'
import CarD from '@/assets/lottie/car-D.json'
import CarE from '@/assets/lottie/car-E.json'
import CarF from '@/assets/lottie/car-F.json'
import CarG from '@/assets/lottie/car-G.json'
import CarH from '@/assets/lottie/car-H.json'
import { random } from 'lodash';
const userStore = useUserStore();
const position = ref('SignIn');
const isInfoEdit = ref(false)

const isShow = ref(true)
const lottieIdx = ref(0)
const lottieList = [
  CarA,
  CarB,
  CarC,
  CarD,
  CarE,
  CarF,
  CarG,
  CarH
]
const useRandom = () => {
  isShow.value = false
  const randomIdx = random(0, lottieList.length - 1, false)
  if (randomIdx !== unref(lottieIdx)) {
    lottieIdx.value = randomIdx
    nextTick(() => {
      isShow.value = true
    })
  } else {
    useRandom()
  }
}
useRandom()
</script>

<style lang="scss">
.chat-login {
  height: 100vh;
  width: 100%;
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