<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-14 23:47:10
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 02:55:26
 * @FilePath: /micro-chat/src/views/about/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
<mc-container>
  <div>about</div>
</mc-container>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore()
console.log(userStore.getInfo);
console.log(userStore.getToken);

</script>

<style>

</style>