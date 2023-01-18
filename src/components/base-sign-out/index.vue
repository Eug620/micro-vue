<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-19 00:53:17
 * @FilePath     : /micro-vue/src/components/base-sign-out/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2023 by eug yyh3531@163.com, All Rights Reserved. 
-->

<template>
  <a-button type="outline" shape="round" @click="userStore.logout">Sign out</a-button>
</template>

<script lang="ts" setup>
import { useUserStore} from '@/store/modules/user'
const userStore = useUserStore()

</script>

<style>
</style>