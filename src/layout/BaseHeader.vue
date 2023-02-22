<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:25:15
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-02-22 14:29:18
 * @FilePath     : /micro-vue/src/layout/BaseHeader.vue
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->

<template>
  <a-menu mode="horizontal" :selected-keys="[$route.name]" @menu-item-click="useMenuItemClick">
    <a-menu-item v-for="routes in renderMenus" :key="routes.name">
      <template #icon>
        <component :is="_ArcoVueIcon[routes.meta.icon]" />
      </template>
      {{ $t(`menu.${routes.name}`) }}
      <!-- {{ routes.meta?.title || routes.name }} -->
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
// import { initRoutes } from "../router/routes";
import ArcoVueIcon from '@arco-design/web-vue/es/icon'


import { useMenus } from '@/store/modules/menus'
import { storeToRefs } from "pinia";
import { computed } from "vue-demi";
import { initRoutes } from "@/router/routes";

const menusStore = useMenus()
const { getMenus } = storeToRefs(menusStore)

const renderMenus = computed(() => {
  return [...initRoutes, ...getMenus.value]
})
type ArcoIcons = {
  [k: string]: any
}
let _ArcoVueIcon: ArcoIcons = ArcoVueIcon

// console.log(initRoutes);
const router = useRouter();

const useMenuItemClick = (name: any) => {
  console.log('router:',router);
  console.log('to:',name);
  router.push({ name })
};
</script>

<style></style>