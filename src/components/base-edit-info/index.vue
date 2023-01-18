<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-19 00:52:44
 * @FilePath     : /micro-vue/src/components/base-edit-info/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2023 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <a-button type="primary" @click="useEdit" shape="round">
    {{ props.value ? 'Cancel' : 'Edit Info' }}
  </a-button>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import { computed, reactive, unref } from 'vue';
const userStore = useUserStore();
const { getInfo } = storeToRefs(userStore);

const userForm = reactive(unref(getInfo));
const props = defineProps({
  value: Boolean,
});
const emit = defineEmits(['update:value']);
const useEdit = () => {
  console.log(!props.value);

  emit('update:value', !props.value);
};
</script>

<style>
</style>