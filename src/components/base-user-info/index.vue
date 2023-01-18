<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-19 00:54:42
 * @FilePath     : /micro-vue/src/components/base-user-info/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2023 by eug yyh3531@163.com, All Rights Reserved. 
-->

<template>
  <base-sign-form type="InfoEdit" v-if="props.value" @submitSuccess="useUpdateValue"/>
  <a-descriptions v-else :data="infoData" title="" fill :column="1" />
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import { computed, reactive, unref } from 'vue';
const userStore = useUserStore();
const { getInfo } = storeToRefs(userStore);
const props = defineProps({
  value: Boolean,
});

const emit = defineEmits(['update:value']);
const keys = computed(() => {
  return Object.keys(unref(getInfo));
});

const infoData = computed(() => {
  return unref(keys).map((k) => {
    return { label: k, value: getInfo.value[k] };
  });
});

const useUpdateValue = () => {
  emit('update:value', !props.value)
}

</script>

<style>
</style>