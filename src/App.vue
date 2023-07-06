<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-21 10:03:12
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-07-06 14:46:00
 * @FilePath     : /micro-vue/src/App.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
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
import { onMounted,watch, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { FamilyEnum } from './enums/system'

const systemStore = useSystemStore()
const userStore = useUserStore()
const routeStore = useRouteStore()


// 配置信息
systemStore.reload()
// 用户信息
userStore.reload()

try {
  const router = useRouter()
  const route = useRoute()
  routeStore.setRouteOptions(router, route)
} catch (error) {
  console.log('getRouter Error', error);
}
const { getFamily } = storeToRefs(systemStore)

onMounted(() => {
  watchEffect(() => {
    const AppVue = document.querySelector('#app-vue')
    if (getFamily.value === FamilyEnum.default) {
      AppVue?.classList.remove(FamilyEnum.fangyuan)
      AppVue?.classList.add(FamilyEnum.default)
    } else {
      AppVue?.classList.add(FamilyEnum.fangyuan)
      AppVue?.classList.remove(FamilyEnum.default)
    }
  })
})
</script>

<style lang="scss"></style>
