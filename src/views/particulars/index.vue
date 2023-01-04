<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-01 09:46:19
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-04 18:34:10
 * @FilePath     : /micro-vue/src/views/particulars/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <a-spin
    class="particulars-container-spin"
    :loading="isLoading"
    :tip="loadingTip"
    style="width:100%;"
  >
    <mc-container class="particulars-container">
      <Viewer
        :value="ArticleInfo.content"
        :plugins="plugins"
      />
    </mc-container>
  </a-spin>
  <a-card hoverable :bordered="false" style="margin-top: 10px">
    <mc-particulars-comment
      ref="refMcParticularsComment"
      :ArticleInfo="ArticleInfo"
    />
  </a-card>
</template>

<script lang="ts" setup>
import ServerApi from "@/api";
import { reactive, UnwrapNestedRefs, nextTick, ref } from "vue-demi";
import { useRoute } from "vue-router";

import { Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import breaks from "@bytemd/plugin-breaks";

const plugins = [
  breaks(),
  gfm(),
  frontmatter(),
  gemoji(),
  highlight(),
  // Add more plugins here
];

const route = useRoute();
const isLoading = ref(true);
const loadingTip = ref("loading...");
const { id } = route.params;
interface ArticleInfoType {
  author?: string;
  content?: string;
  count?: number;
  create_time?: number;
  describe?: string;
  id?: string;
  page_views?: number;
  title?: string;
  user_name?: string;
  [k: string]: any;
}
interface ResponcesType {
  code: number;
  data: ArticleInfoType;
  msg: string;
}

let ArticleInfo: UnwrapNestedRefs<ArticleInfoType> = reactive({});
const useGetArticleDetail = async () => {
  try {
    isLoading.value = true;
    let res: ResponcesType = await ServerApi.GetArticleDetail({ id });
    console.log(res);
    for (const key in res.data) {
      ArticleInfo[key] = res.data[key];
    }
  } catch (error) {
  } finally {
    nextTick(() => {
      isLoading.value = false;
    });
  }
};
useGetArticleDetail();
</script>

<style lang="scss">
</style>