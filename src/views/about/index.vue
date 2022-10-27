<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-10-27 10:29:55
 * @FilePath     : /micro-vue/src/views/about/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
<mc-container>
  <a-card title="User">
      <template #extra>
        <template v-if="!userStore.isLogin">
          <a-radio-group v-model="position" type="button">
            <a-radio value="SignIn">Sign in</a-radio>
            <a-radio value="SignUp">Sign up</a-radio>
          </a-radio-group>
        </template>
        <template v-else>
          <base-edit-info  v-model:value="isInfoEdit" @update:value="isInfoEdit"/>
          <a-divider direction="vertical" />
          <base-sign-out/>
          <!-- <a-divider direction="vertical" />
          <base-draw-down/> -->
        </template>
      </template>
      <template v-if="!userStore.isLogin">
        <base-sign-form v-model:type="position"/>
      </template>
      <template v-else>
        <base-user-info v-model:value="isInfoEdit"/>
      </template>
    </a-card>
</mc-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const position = ref('SignIn');
const isInfoEdit = ref(false)

</script>

<style>

</style>