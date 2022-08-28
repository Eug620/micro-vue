<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-15 00:10:47
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 07:58:35
 * @FilePath: /micro-chat/src/layout/BaseHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-menu
    mode="horizontal"
    :selected-keys="[$route.name]"
    @menu-item-click="useMenuItemClick"
  >
    <a-menu-item v-for="routes in commonRoutes" :key="routes.name">
      <template #icon>
        <component :is="routes.meta.icon"/>
      </template>
      {{ routes.meta?.title || routes.name }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
// import { initRoutes } from "../router/routes";
import * as ArcoIcons from '@arco-design/web-vue/es/icon'


import { useMenus } from '@/store/modules/menus'
import { storeToRefs } from "pinia";
import { computed } from "vue-demi";
import { frameLogin, initRoutes } from "@/router/routes";
import { useUserStore } from "@/store/modules/user";

const menusStore = useMenus()
const { getMenus } = storeToRefs(menusStore)
const userStore = useUserStore()
const commonRoutes = computed(() => {
  return userStore.isLogin ? [ ...initRoutes,...getMenus.value] : [...initRoutes,...getMenus.value, ...frameLogin]
})
// console.log(initRoutes);
const router = useRouter();

const useRenderIcon = () => {
  // return ArcoIcons[]
  return ''
}

const useMenuItemClick = (name: any) => {
  router.push({
    name
  });
};
</script>

<style>
</style>