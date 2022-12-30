<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-01 09:46:19
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-12-30 14:19:09
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
      <!-- <a-card hoverable class="particulars-container"  :bordered="false"> -->
      <div
        v-html="marked.parse(ArticleInfo.content || '')"
        id="particulars-container-content"
      ></div>
      <!-- </a-card> -->
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
import { marked } from "marked";
import hljs from "highlight.js";
const str = "### 1222\n\n```js\n    const count = 12;\n```"
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  // sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: (code: any) => {
    return hljs.highlightAuto(code).value;
  },
});

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
@import "./index.scss";
</style>