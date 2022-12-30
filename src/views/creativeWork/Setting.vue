<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-12-30 16:03:31
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-12-30 17:24:06
 * @FilePath     : /micro-vue/src/views/creativeWork/setting.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <a-form-item field="name" label="Username">
    <a-input v-model="name" placeholder="please enter your username..." />
  </a-form-item>
</template>

<script setup lang="ts">
import { ref } from "vue";
const name = ref("");

</script>

<style>
</style>