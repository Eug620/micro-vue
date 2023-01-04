<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-12-30 16:03:31
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-04 12:48:19
 * @FilePath     : /micro-vue/src/views/creativeWork/Setting.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
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
    <a-input
      v-model="DefaultGfmPlaceholder"
      placeholder="Please enter placeholder"
      allow-clear
    />
  </a-form-item>
  <a-form-item field="placeholder" label="placeholder">
    <a-input-number
      v-model="DefaultGfmMaxLength"
      placeholder="Please Enter"
      :min="1000"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMittStore } from "@/store/modules/mitt";
import { storeToRefs } from "pinia";
import {
  // local
  GfmLocale,
  DefaultGfmLocale,
  GfmLocaleEnum,
  // mode
  GfmModeEnum,
  DefaultGfmMode,
  // placeholder
  DefaultGfmPlaceholder,
  // maxlength
  DefaultGfmMaxLength,
} from "./variable";
const mittStore = useMittStore();
const { emitter } = storeToRefs(mittStore);

watch(DefaultGfmLocale, (value) => {
  emitter.value.emit("work", { type: "local", value });
});
</script>

<style>
</style>