<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-12-30 15:22:31
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-06-25 18:28:23
 * @FilePath     : /micro-vue/src/components/mc-setting/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <a-drawer
    width="36%"
    :visible="visibleDrawer"
    @ok="useDrawerSubmit"
    @cancel="useDrawerCancel"
    :mask-closable="false"
    :footer="false"
    unmountOnClose
  >
    <template #title>{{ $t("vue.creativeWork.drawerTitle") }}</template>

    <a-form :model="form" layout="vertical">
      <!-- <a-divider orientation="left">系统配置</a-divider>
      <a-form-item field="lang" label="语言切换">
        <a-radio-group
          type="button"
          v-model="form.lang"
          :default-value="system.lang"
          @change="useLangChange"
        >
          <a-radio :value="item" v-for="item in LangEnum" :key="item">{{
            item
          }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item field="theme" label="主题切换">
        <a-radio-group
          type="button"
          :default-value="system.theme"
          v-model="form.theme"
          @change="useThemeChange"
        >
          <a-radio :value="item" v-for="item in ThemeEnum" :key="item">{{
            item
          }}</a-radio>
        </a-radio-group>
      </a-form-item> -->
    <slot />
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { LangEnum, ThemeEnum } from "@/enums/system";
import { useSystemStore } from "@/store/modules/app";
import { reactive, ref, provide } from "vue";

const system = useSystemStore();
const visibleDrawer = ref(false);
const form = reactive({
  lang: system.lang,
  theme: system.theme,
});
document.addEventListener("keydown", (e) => {
  if (e.altKey && e.ctrlKey && e.keyCode === 84) {
    open()
  }
});
const useLangChange = (val: any) => {
  system.setLang(val as LangEnum)
}

const useThemeChange = (val: any) => {
  system.setTheme(val as ThemeEnum)
}

const useDrawerSubmit = () => {
  close()
};

const useDrawerCancel = () => {
  close()
};

const close = () => {
  visibleDrawer.value = false
}
const open = () => {
  visibleDrawer.value = true
}

provide('close', close)
provide('open', open)
</script>

<style>
</style>