<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-12-30 16:27:54
 * @FilePath     : /micro-vue/src/App.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <router-view/>
</template>

<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useUserStore } from '@/store/modules/user'
import { useSystemStore } from '@/store/modules/app'
import { useRouteStore } from '@/store/modules/route'
import { useRoute, useRouter } from 'vue-router'

const systemStore = useSystemStore()
const userStore = useUserStore()
const routeStore =  useRouteStore()


// 配置信息
systemStore.reload()
// 用户信息
userStore.reload()

try {
  const router = useRouter()
  const route = useRoute()
  routeStore.setRouteOptions(router,route)
} catch (error) {
  console.log('getRouter Error', error);
}
</script>

<style lang="scss">

</style>
