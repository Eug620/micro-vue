<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-16 23:52:04
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-02-02 15:31:37
 * @FilePath     : /micro-vue/src/views/dashboard/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container class="dashboard-container">
    <div class="dashboard-container-background">
      <h4>
        <span :style="{
          margin: '0px 10px',
          color: type === item ? 'red' : '#ccc'
        }" v-for="item in typeList" @click="type = item" :key="item"> {{ item }}</span>
      </h4>
      <br>
      <h4  style="margin-bottom: 20px;">
        <span :style="{
          margin: '0px 10px',
          color: time === item ? 'red' : '#ccc'
        }" v-for="item in timeList" @click="time = item" :key="item"> {{ item }}</span>
      </h4>

      <h5>标题: {{ current.title }}</h5>
      <h5>更新时间: {{ current.time }}</h5>
      <h5 v-if="current.fortune">运势:
        <p>综合运势: {{ current.fortune.all }}</p>
        <p>爱情运势: {{ current.fortune.love }}</p>
        <p>学业工作: {{ current.fortune.work }}</p>
        <p>财富运势: {{ current.fortune.money }}</p>
      </h5>
      <h5 v-if="current.index">指数:
        <p>健康指数: {{ current.index.health }}</p>
        <p>商谈指数: {{ current.index.discuss }}</p>
      </h5>
      <h5>幸运颜色: {{ current.luckycolor }}</h5>
      <h5>幸运数字: {{ current.luckynumber }}</h5>
      <h5>速配星座: {{ current.luckyconstellation }}</h5>
      <h5>短评: {{ current.shortcomment }}</h5>

      <h5 v-if="current.fortunetext">运势解析:
        <p>综合运势: {{ current.fortunetext.all }}</p>
        <p>爱情运势: {{ current.fortunetext.love }}</p>
        <p>学业工作: {{ current.fortunetext.work }}</p>
        <p>财富运势: {{ current.fortunetext.money }}</p>
        <p>健康运势: {{ current.fortunetext.health }}</p>
      </h5>

      <!-- <div class="dashboard-container-background-title">{{title}}</div>
      <div class="dashboard-container-background-content">{{content}}</div> -->
      <!-- {{ $t("message.hello") }} -->
    </div>
  </mc-container>
</template>

<script lang="ts" setup>
import ServerApi from "@/api";
import { ref, watchEffect } from "vue-demi";

const current: any = ref({})

const typeList = ref(['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'])
const timeList = ref(['today', 'nextday', 'week', 'month', 'year', 'love'])
const type = ref('leo')
const time = ref('week')
const useHoroscope = async () => {
  try {
    let res = await ServerApi.Horoscope({
      type: type.value,
      time: time.value
    });
    if (res.success) {
      current.value = Object.assign(current.value, res.data)
    }
  } catch (error) {
    console.log(error);
  }
};
watchEffect(() => useHoroscope())

</script>

<style lang="scss">
.dashboard-container {
  &-background {
    // position: absolute;
    // left: 0;
    // top: 0;
    // width: 100%;
    // height: 100%;
    color: rgba(0, 0, 0, 0);
    font-weight: 900;
    background: url("https://momentum.photos/img/b286b86e-0a7f-46fb-9bcb-f526a24b40eb.jpg?momo_cache_bg_uuid=c2110704-2468-47e6-a05b-09856ed3d5a9") no-repeat center/cover;
    background-clip: text;
    -webkit-background-clip: text;
    box-sizing: border-box;
  }
}
</style>