<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-14 22:24:52
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-01 16:32:09
 * @FilePath: /micro-chat/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <router-view />
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

<style scoped lang="scss">

</style>
