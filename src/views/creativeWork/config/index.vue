<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-12-30 16:03:31
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-06 10:16:10
 * @FilePath     : /micro-vue/src/views/creativeWork/config/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <a-divider orientation="left">编辑器配置</a-divider>
  <a-form-item field="local" label="local">
    <a-select v-model="DefaultGfmLocale" placeholder="Please select ...">
      <a-option v-for="i in GfmLocaleEnum" :key="i">{{ i }}</a-option>
    </a-select>
  </a-form-item>
  <a-form-item field="mode" label="mode">
    <a-select v-model="DefaultGfmMode" placeholder="Please select ...">
      <a-option v-for="i in GfmModeEnum" :key="i">{{ i }}</a-option>
    </a-select>
  </a-form-item>
  <a-form-item field="placeholder" label="placeholder">
    <a-input v-model="DefaultGfmPlaceholder" placeholder="Please enter placeholder" allow-clear />
  </a-form-item>
  <a-form-item field="mermaid_local" label="mermaid local">
    <a-select v-model="DefaultMermaidLocale" placeholder="Please select ...">
      <a-option v-for="i in MermaidLocaleEnum" :key="i">{{ i }}</a-option>
    </a-select>
  </a-form-item>
  <a-divider orientation="left">文章</a-divider>
  <a-form-item field="title" label="Article Title">
    <a-input v-model.trim="DefaulArticleTitle" placeholder="Please enter Title" allow-clear />
  </a-form-item>
  <a-form-item field="description" label="Article Description">
    <a-input v-model.trim="DefaulArticleDescription" placeholder="Please enter Description" allow-clear />
  </a-form-item>
  <a-button type="primary" html-type="submit" @click="useCreateArticle">Submit</a-button>
</template>

<script setup lang="ts">
// import { useMittStore } from "@/store/modules/mitt";
// import { storeToRefs } from "pinia";
import ServerApi from "@/api";
import { Notification } from '@arco-design/web-vue';
import { inject } from "vue-demi";
import {
  // local
  // GfmLocale,
  DefaultGfmLocale,
  GfmLocaleEnum,
  // mode
  GfmModeEnum,
  DefaultGfmMode,
  // placeholder
  DefaultGfmPlaceholder,
  // mermaid lang
  DefaultMermaidLocale,
  MermaidLocaleEnum,
  // article
  DefaulArticleTitle,
  DefaulArticleDescription,
  // value
  DefaultGfmValue
} from "./variable";
// const mittStore = useMittStore();
// const { emitter } = storeToRefs(mittStore);

// watch(DefaultGfmLocale, (value) => {
//   emitter.value.emit("work", { type: "local", value });
// });
const close:any = inject('close')
const useCreateArticle = async () => {
  if (DefaulArticleTitle.value && DefaulArticleDescription.value && DefaultGfmValue.value) {
    try {
      let res: any = await ServerApi.ArticleAdd({
        title: DefaulArticleTitle.value,
        describe: DefaulArticleDescription.value,
        content: DefaultGfmValue.value,
      });
      if (res.code === 200) {
        DefaulArticleTitle.value = ''
        DefaulArticleDescription.value = ''
        DefaultGfmValue.value = ''
        close()
      } 
    } catch (error:any) { 
      Notification.error({
        title: 'Error',
        content: error,
      });
     }
  } else {
    Notification.warning({
      title: 'warning',
      content: 'title、description、value is required',
    });
  }
}
</script>

<style>

</style>