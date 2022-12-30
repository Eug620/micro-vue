<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-11-18 17:18:40
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-12-30 18:38:20
 * @FilePath     : /micro-vue/src/views/creativeWork/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <Editor
    :value="value"
    mode="auto"
    :locale="EditorLocale"
    placeholder="......"
    :plugins="plugins"
    @change="handleChange"
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
// lang
import GfmZhHans from "bytemd/locales/zh_Hans.json";

import { Input, FormItem, Form, RadioGroup,Radio } from "@arco-design/web-vue";

// test
import { defineEmits } from "vue";
// local
const localeObject = {
  'GfmZhHans': GfmZhHans
}
const EditorLocale = ref(GfmZhHans);


const emit = defineEmits(["setting"]);
// emit('setting', Setting)
const hello = ref("22222");
// <a-radio-group
//           type="button"
//           v-model="form.lang"
//           :default-value="system.lang"
//           @change="system.setLang"
//         >
//           <a-radio :value="item" v-for="item in langOptions" :key="item">{{
//             item
//           }}</a-radio>
//         </a-radio-group>
const test = () => {
  return [
    // h(RadioGroup, {
    //   ["onUpdate:modelValue"]: (val: string) => {
    //     EditorLocale.value = localeObject[val];
    //   },
    //   modelValue: 'GfmZhHans',
    // },[
    //   h(Radio, {modelValue: 'GfmZhHans'})
    // ]),
    h(Input, {
      ["onUpdate:modelValue"]: (val: string) => {
        hello.value = val;
      },
      modelValue: hello.value,
      placeholder: "please enter your username...",
    }),
  ];
};
emit("setting", test);

const plugins = [
  breaks(),
  gfm(),
  frontmatter(),
  gemoji(),
  highlight(),
  // Add more plugins here
];
const value = ref("");
const name = ref("");
const handleChange = (v: string) => {
  value.value = v;
};
</script>

<style lang="scss">
$content-height: calc(100vh - 78px);
.bytemd {
  height: $content-height;
}
</style>