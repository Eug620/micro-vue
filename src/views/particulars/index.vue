<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 07:37:20
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 18:09:29
 * @FilePath: /micro-chat/src/views/particulars/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- <mc-container class="particulars-container"> -->
  <a-card hoverable :bordered="false">
    <a-spin
      class="particulars-container"
      :loading="isLoading"
      :tip="loadingTip"
      style="width: 100%; min-height: 80%"
    >
      <div
        v-html="marked.parse(ArticleInfo.content || '')"
        id="particulars-container-content"
      ></div>
    </a-spin>
  </a-card>
  <!-- </mc-container> -->
  <a-card  hoverable :bordered="false" style="margin-top:10px;">
    <mc-particulars-comment :ArticleInfo="ArticleInfo"/>
  </a-card>
</template>

<script lang="ts" setup>
import ServerApi from "@/api";
import { reactive, UnwrapNestedRefs, nextTick } from "vue-demi";
import { useRoute } from "vue-router";
import { marked } from "marked";
import hljs from "highlight.js";
import { ref } from "vue";

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
const loadingTip = ref("This may take a while...");

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