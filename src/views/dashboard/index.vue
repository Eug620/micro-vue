<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-16 23:52:04
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-02-22 15:45:42
 * @FilePath     : /micro-vue/src/views/dashboard/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container class="dashboard-container">
    <div class="dashboard-container-background" v-if="isShowHoroscope">
      <a-space direction="vertical" fill align="center">

        <a-radio-group type="button" v-model="type">
          <a-radio :value="item.value" v-for="item in typeList" :key="item.value">{{ item.label }}</a-radio>
        </a-radio-group>
        <a-radio-group type="button" v-model="time">
          <a-radio :value="item.value" v-for="item in timeList" :key="item.value">{{ item.label }}</a-radio>
        </a-radio-group>
      </a-space>
      <a-descriptions style="margin-top: 20px" :data="data" :title="current.title" :column="1" />
    </div>
    <div class="dashboard-container-image" v-else>
      <a-select :style="{ width: '800px', marginBottom: '20px' }" v-model="currentListIdx" placeholder="请选择..."
        allow-search>
        <a-option v-for="(img, idx) in imageList" :key="img.id" :value="idx">
          {{ img.id }}
        </a-option>
      </a-select>
      <a-image width="800" fit="fill" :src="imageList[currentListIdx]?.url" :title="imageList[currentListIdx]?.id"
        :description="imageList[currentListIdx]?.url" />
    </div>
  </mc-container>
</template>

<script lang="ts" setup>
import ServerApi from "@/api";
import { ref, watchEffect, Ref } from "vue-demi";
import { useRouter } from "vue-router";

const router = useRouter()
const currentListIdx = ref(0)
const imageList: Ref<any[]> = ref([])
ServerApi.GetImageAll().then((res: any) => {
  imageList.value.push(...res.data)
})

const isShowHoroscope = ref(true)

const current: any = ref({})

const typeList = ref([
  {
    label: '白羊座',
    value: 'aries'
  }, {
    label: '金牛座',
    value: 'taurus'
  },
  {
    label: '双子座',
    value: 'gemini'
  },
  {
    label: '巨蟹座',
    value: 'cancer'
  },
  {
    label: '狮子座',
    value: 'leo'
  },
  {
    label: '处女座',
    value: 'virgo'
  },
  {
    label: '天秤座',
    value: 'libra'
  },
  {
    label: '天蝎座',
    value: 'scorpio'
  },
  {
    label: '射手座',
    value: 'sagittarius'
  },
  {
    label: '摩羯座',
    value: 'capricorn'
  },
  {
    label: '水瓶座',
    value: 'aquarius'
  },
  {
    label: '双鱼座',
    value: 'pisces'
  },
])
const timeList = ref([
  {
    label: '今天',
    value: 'today'
  },
  {
    label: '明天',
    value: 'nextday'
  },
  {
    label: '本周',
    value: 'week'
  },
  {
    label: '今年',
    value: 'year'
  },
  {
    label: '❤️',
    value: 'love'
  }
])
const type = ref('leo')
const time = ref('today')
const data = ref([])
const useHoroscope = async () => {
  try {
    let res = await ServerApi.Horoscope({
      type: type.value,
      time: time.value
    });
    if (res.success) {

      current.value = Object.assign(current.value, res.data)
      data.value = Object.assign([], [
        {
          label: '更新时间',
          value: current.value.time
        },
        {
          label: '综合运势',
          value: current.value.fortune.all
        },
        {
          label: '爱情运势',
          value: current.value.fortune.love
        },
        {
          label: '学业工作',
          value: current.value.fortune.work
        },
        {
          label: '财富运势',
          value: current.value.fortune.money
        },
        {
          label: '健康指数',
          value: current.value?.index?.health
        },
        {
          label: '商谈指数',
          value: current.value?.index?.discuss
        },
        {
          label: '幸运颜色',
          value: current.value.luckycolor
        },
        {
          label: '幸运数字',
          value: current.value.luckynumber
        },
        {
          label: '速配星座',
          value: current.value.luckyconstellation
        },
        {
          label: '短评',
          value: current.value.shortcomment
        },
        {
          label: '综合运势',
          value: current.value?.fortunetext?.all
        },
        {
          label: '爱情运势',
          value: current.value.fortunetext.love
        },
        {
          label: '学业工作',
          value: current.value.fortunetext.work
        },
        {
          label: '财富运势',
          value: current.value.fortunetext.money
        },
        {
          label: '健康运势',
          value: current.value.fortunetext.health
        },
      ])
    }
  } catch (error) {
    console.log(error);
    isShowHoroscope.value = false
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

  &-image {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>