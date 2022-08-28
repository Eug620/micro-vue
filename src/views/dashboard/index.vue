<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-07-14 23:03:40
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 02:38:49
 * @FilePath: /micro-chat/src/views/dashboard/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <mc-container>
      <a-tabs v-model:active-key="activeKey"  type="capsule" @change="useTabChange">
        <a-tab-pane :title="item.name" v-for="item in hotList" :key="item.type">
            <a-list>
              <template #header>
                {{item.name}}
              </template>
              <a-list-item v-for="article in item.data" :key="article.url">{{article.title}}</a-list-item>
            </a-list>
        </a-tab-pane>
  </a-tabs>
    </mc-container>
  <!-- <a-carousel
    indicator-type="slider"
    indicator-position="top"
    :style="{
      width: '100%',
      height: '100%',
      margin: '0 auto',
    }"
    :default-current="2"
    @change="handleChange"
  >
    <a-carousel-item v-for="image in images" :key="image">
      <a-row class="grid-demo">
        <a-col :span="6" :order="4">
          <div>1 col-order-4</div>
        </a-col>
        <a-col :span="6" :order="3">
          <div>2 col-order-3</div>
        </a-col>
        <a-col :span="6" :order="2">
          <div>3 col-order-2</div>
        </a-col>
        <a-col :span="6" :order="1">
          <div>4 col-order-1</div>
        </a-col>
      </a-row>
    </a-carousel-item>
  </a-carousel> -->
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useMenus } from '@/store/modules/menus'
import { storeToRefs } from "pinia";

const menusStore = useMenus()
const { getMenus } = storeToRefs(menusStore)

// serverApi.GetHotList()
let hotList= ref([
  {
    type: 'zhihu',
    name: '知乎热榜',
    data: [],
    isReload: false
  },
]);

let activeKey = ref('')
activeKey.value = hotList.value[0].type

const activeIdx = computed(() => {
  return hotList.value.findIndex(v => v.type === activeKey.value)
})

const useGetList = async () => {
  try {
  } catch (error) {

  }
}
useGetList()
const useTabChange = () => {
  if (!hotList.value[activeIdx.value].isReload) {
    useGetList()
  }
}
</script>

<style>
</style>