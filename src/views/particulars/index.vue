<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-01 09:46:19
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-02-17 14:03:15
 * @FilePath     : /micro-vue/src/views/particulars/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <a-spin class="particulars-container-spin" :loading="isLoading" :tip="loadingTip">
    <div class="full-height">
      <mc-container class="particulars-container">
        <Viewer mode="tab" style="color: var(--color-text-1);background-color: rgba(0, 0, 0, 0)"
          :value="ArticleInfo.content" :plugins="DefaultEditorPlugins" />
      </mc-container>
    </div>
  </a-spin>
  <a-card hoverable :bordered="false" class="full-height particulars-toc">
    <a-descriptions :align="{ label: 'center' }" class="animate__slideInDown animate__animated" layout="horizontal"
      size="mini" :title="ArticleInfo.title" :column="1">
      <template #title>
        <a-divider orientation="left">{{ ArticleInfo.title }}</a-divider>
      </template>
      <a-descriptions-item style="display:flex;">
        <template #label>
          <IconTags />
        </template>
        {{ ArticleInfo.describe }}
      </a-descriptions-item>
      <a-descriptions-item>
        <template #label>
          <IconUser />
        </template>
        {{ ArticleInfo.user_name }}
      </a-descriptions-item>
      <a-descriptions-item>
        <template #label>
          <IconEye />
        </template>
        {{ ArticleInfo.page_views }} 次
      </a-descriptions-item>
      <a-descriptions-item>
        <template #label>
          <IconSchedule />
        </template>
        {{ useTransformSecond(ArticleInfo.create_time) }}
      </a-descriptions-item>
      <a-descriptions-item>
        <template #label>
          <IconMessage />
        </template>
        {{ ArticleInfo.count }} 条
      </a-descriptions-item>
    </a-descriptions>

    <a-divider />

    <ul v-show="leftType === LeftType.TOC" class="animate__fadeInRight animate__animated">
      <li v-for="(item, index) in items" :class="currentHeadingIndex === index ? ' active' : ''"
        :key="`${item.level}-${item.text}`" :style="{ paddingLeft: (item.level - minLevel) * 16 + 8 }"
        @click="skipContent(index)">{{ item.text }}</li>
      <a-result status="warning" title="暂无目录" v-if="!items.length" style="margin-top: 42px;">
        <template #icon>
          <IconList />
        </template>
        <template #subtitle>
          解析目录失败
        </template>
        <template #extra>
          <a-space>
            <!-- <a-button type='primary'>Back</a-button> -->
          </a-space>
        </template>
      </a-result>
    </ul>
    <ul v-show="leftType === LeftType.COM">
      <mc-particulars-comment ref="refMcParticularsComment" :ArticleInfo="ArticleInfo" />
    </ul>


    <a-divider />
    <a-button-group style="margin: 0 auto;">
      <a-button @click="useTypeChange(LeftType.TOC)" :type="leftType === LeftType.TOC ? 'primary' : undefined">
        <IconLeft />
        {{ $t('pages.particulars.catalogue') }}
      </a-button>
      <a-button @click="useTypeChange(LeftType.COM)" :type="leftType === LeftType.COM ? 'primary' : undefined">
        {{ $t('pages.particulars.comment') }}
        <IconRight />
      </a-button>
    </a-button-group>
  </a-card>
</template>

<script lang="ts" setup>
import ServerApi from "@/api";
import { reactive, UnwrapNestedRefs, nextTick, ref, computed, Ref } from "vue-demi";
import { useRoute } from "vue-router";

import { Viewer } from "@bytemd/vue-next";
// plugins
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import breaks from "@bytemd/plugin-breaks";
import footnotes from '@bytemd/plugin-footnotes'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import { DefaultMermaidLocaleValue } from "@/views/creative/config/variable";
import { useTransformSecond } from "@/plugin/transform-time";

// icon
import {
  IconUser,
  IconEye,
  IconTags,
  IconSchedule,
  IconMessage,
  IconLeft,
  IconRight,
  IconList
} from "@arco-design/web-vue/es/icon";
enum LeftType {
  TOC = 'TOC',
  COM = 'COM'
}
const leftType: Ref<LeftType> = ref(LeftType.TOC)
const useTypeChange = (type: LeftType) => {
  leftType.value = type
}
/**
 * 目录相关
 */
type Item = { level: number; text: string };
const items: Ref<any> = ref([])
const minLevel = ref(6)
const currentHeadingIndex = ref(0)
const useRenderTOC = () => {
  const root = document.querySelector('.markdown-body') as HTMLElement;
  /**
   * init table of content
   * refer to bytemd/packages/bytemd/src/toc.svelte
   **/
  const _items: Item[] = [];
  let _minLevel = minLevel.value;
  // root.children is HTMLCollection
  Array.prototype.filter.call(root.children, (v) => v && v.nodeType === 1).forEach((node: HTMLElement, index) => {
    if (node.tagName[0].toLowerCase() === 'h' && (node.hasChildNodes())) {
      const i = Number(node.tagName[1]); // h1 h2 h3 h4 h5 h6
      _minLevel = Math.min(_minLevel, i)
      _items.push({
        level: i,
        text: node.innerText, // stringifyHeading(node),
      })
    }
  })
  items.value = _items
  minLevel.value = _minLevel
}
const scrolling = ref(false)
const skipContent = (index: number) => {
  const root = document.querySelector('.markdown-body') as HTMLElement;
  const headings = root.querySelectorAll('h1,h2,h3,h4,h5,h6');
  currentHeadingIndex.value = index
  scrolling.value = true
  headings[index].scrollIntoView({
    behavior: 'smooth'
  });
  setTimeout(() => {
    scrolling.value = false
  }, headings.length * 80)
}
const watching = () => {
  const root = document.querySelector('.markdown-body') as HTMLElement;
  const headings = root.querySelectorAll('h1,h2,h3,h4,h5,h6');

  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    if (scrolling.value) return
    const io: IntersectionObserverEntry = entries[0];
    if (io.isIntersecting === true) {
      const index = Array.prototype.indexOf.call(headings, io.target);
      currentHeadingIndex.value = index
    }
    // scrolling.value = false
  }, { threshold: [1] });

  // observe all head
  headings.forEach(node => observer.observe(node));

  return () => {
    headings.forEach(node => observer.unobserve(node));
  }
}

/**
 * 配置相关
 */
const DefaultEditorPlugins = computed(() => {
  return [
    breaks(),
    gfm(),
    mermaid({
      locale: DefaultMermaidLocaleValue.value
    }),
    footnotes(),
    mediumZoom(),
    frontmatter(),
    gemoji(),
    highlight(),
    // Add more plugins here
  ]
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
    if (res.code === 200) {
      ArticleInfo = Object.assign(ArticleInfo, res.data)
    }

    setTimeout(() => {
      useRenderTOC()
      watching()
    }, 0)
  } catch (error) {
    console.log(error);
  } finally {
    nextTick(() => {
      isLoading.value = false;
    });
  }
};
useGetArticleDetail();
</script>

<style lang="scss">
.particulars {
  &-container-spin {
    width: 80%;
    float: right;
  }

  &-toc {
    position: absolute;
    width: calc(20% - 15px);
    left: 10px;
    height: calc(100vh - 68px - 10px);
    overflow: hidden;

    .arco-descriptions-item-label {
      padding-left: 10px;
      padding-right: 10px;
    }


    .arco-card-body {
      height: calc(100% - 30px);
      display: flex;
      flex-direction: column;
    }

    .active {
      color: var(--color-text-2);
      background-color: rgb(var(--arcoblue-1));
    }

    ul {
      // height: calc(100vh - 68px - 10px - 400px);
      flex: 1;
      overflow: auto;
    }

    li {
      // padding: 10px 0;
      color: var(--color-text-3);
      list-style: none;
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 2;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }


}
</style>