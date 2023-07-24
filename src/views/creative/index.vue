<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-11-18 17:18:40
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-07-24 11:18:05
 * @FilePath     : /micro-vue/src/views/creative/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <Editor :value="DefaultGfmValue" :mode="DefaultGfmMode" :locale="DefaultGfmLocaleValue"
    :placeholder="DefaultGfmPlaceholder" :plugins="DefaultEditorPlugins" @change="handleChange" />
  <a-button type="outline" status="danger" @click="useShowSetting" shape="circle" size="large"
    class="!fixed right-6 bottom-12">
    <IconSettings size="22" />
  </a-button>
</template>

<script setup lang="ts">
import { computed, onActivated, onMounted, onUnmounted, onBeforeUnmount } from "vue-demi";
import { Editor } from "@bytemd/vue-next";
// plugins
import gfm from "@bytemd/plugin-gfm";
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import breaks from "@bytemd/plugin-breaks";
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'

import Setting from './config/index.vue'

import { useMittStore } from "@/store/modules/mitt";
import { storeToRefs } from "pinia";
import {
  DefaultGfmLocaleValue,
  DefaultGfmValue,
  DefaultGfmMode,
  DefaultGfmPlaceholder,
  DefaultMermaidLocaleValue,
  DefaulArticleTitle,
  DefaulArticleTag,
  DefaulArticleDescription,
} from './config/variable'
import { IconSettings } from "@arco-design/web-vue/es/icon";
import { useRoute } from "vue-router";
import ServerApi from "@/api";
const route = useRoute()


const mittStore = useMittStore()
const { mitt } = storeToRefs(mittStore)
onActivated(() => {
  mitt.value.emit('setting', Setting)
})

const useGetDetails = async () => {
  try {
    let res = await ServerApi.GetArticleDetail({
      id: route.params.id
    })
    DefaultGfmValue.value = res.data.content
    DefaulArticleTitle.value = res.data.title
    DefaulArticleTag.value = res.data.tag.split(',').filter((v: string) => v)
    DefaulArticleDescription.value = res.data.describe
  } catch (e) {
    console.log(e);
  }
}
onMounted(() => {
  if (route.name === "creative-edit") {
    mitt.value.emit('setting', Setting)
    useGetDetails()
  }
})

onBeforeUnmount(() => {
  DefaulArticleTitle.value = ''
  DefaulArticleDescription.value = ''
  DefaulArticleTag.value = []
  DefaultGfmValue.value = ''
})
// const emit = defineEmits(["setting"]);
// emit('setting', Setting)

const DefaultEditorPlugins = computed(() => {
  return [
    breaks(),
    gfm(),
    mermaid({
      locale: DefaultMermaidLocaleValue.value
    }),
    footnotes(),
    mediumZoom(),
    frontmatter(),
    gemoji(),
    highlight(),
    // Add more plugins here
  ]
});
const handleChange = (v: string) => {
  DefaultGfmValue.value = v;
};

const useShowSetting = () => {
  mitt.value.emit('setting-visible', true);
}
</script>

<style lang="scss">
$content-height: calc(100vh - 78px);

.bytemd {
  height: $content-height;
}
</style>