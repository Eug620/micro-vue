<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-11-18 17:18:40
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-04 12:50:29
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
    :plugins="plugins"
    @change="handleChange"
    :max-length="DefaultGfmMaxLength"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, watch, h } from "vue-demi";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import "github-markdown-css/github-markdown-light.css";
import breaks from "@bytemd/plugin-breaks";


import Setting from './setting.vue'
import { DefaultGfmLocaleValue, DefaultGfmValue, DefaultGfmMode, DefaultGfmPlaceholder, DefaultGfmMaxLength } from './variable'

const emit = defineEmits(["setting"]);
emit('setting', Setting)

const plugins = [
  breaks(),
  gfm(),
  frontmatter(),
  gemoji(),
  highlight(),
  // Add more plugins here
];
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