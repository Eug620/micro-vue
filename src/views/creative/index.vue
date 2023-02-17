<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-11-18 17:18:40
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-06 10:08:14
 * @FilePath     : /micro-vue/src/views/creativeWork/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <Editor 
    :value="DefaultGfmValue" 
    :mode="DefaultGfmMode" 
    :locale="DefaultGfmLocaleValue"
    :placeholder="DefaultGfmPlaceholder" 
    :plugins="DefaultEditorPlugins" 
    @change="handleChange" 
  />
</template>

<script setup lang="ts">
import { computed } from "vue-demi";
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
} from './config/variable'


const mittStore = useMittStore()
const { mitt } = storeToRefs(mittStore)
mitt.value.emit('setting', Setting)
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
</script>

<style lang="scss">
$content-height: calc(100vh - 78px);

.bytemd {
  height: $content-height;
}
</style>