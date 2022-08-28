
<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-27 19:04:27
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-27 22:16:49
 * @FilePath: /micro-base/src/components/base-sign-up/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <base-sign-form type="InfoEdit" v-if="props.value" @submitSuccess="useUpdateValue"/>
  <a-descriptions v-else :data="infoData" title="User Info" fill :column="1" />
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