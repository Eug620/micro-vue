<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-02-17 14:05:02
 * @FilePath     : /micro-vue/src/views/about/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container>
    <a-card :title="$t('pages.about.userInfo')">
      <template #extra>
        <template v-if="!userStore.isLogin">
          <a-radio-group v-model="position" type="button">
            <a-radio value="SignIn">{{ $t('button.signIn') }}</a-radio>
            <a-radio value="SignUp">{{ $t('button.signUp') }}</a-radio>
          </a-radio-group>
        </template>
        <template v-else>
          <base-edit-info v-model:value="isInfoEdit" @update:value="isInfoEdit" />
          <a-divider direction="vertical" />
          <base-sign-out />
          <!-- <a-divider direction="vertical" />
              <base-draw-down/> -->
        </template>
      </template>
      <template v-if="!userStore.isLogin">
        <base-sign-form v-model:type="position" />
      </template>
      <template v-else>
        <base-user-info v-model:value="isInfoEdit" />
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

<style></style>