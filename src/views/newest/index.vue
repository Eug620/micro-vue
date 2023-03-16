<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 04:10:07
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 07:59:24
 * @FilePath: /micro-chat/src/views/newest/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="newest-container" ref="refNewestContainer">
    <a-card v-for="newes in newestList" :key="newes.id" @click="useJumpParticulars(newes)" class="newest-container-item">
      <template #title>
        <a-page-header class="newest-container-item-title" :show-back="false" :title="newes.title"
          :subtitle="`${$t('pages.newest.by')} ${newes.user_name}`">
        </a-page-header>
      </template>
      <template #extra>
        {{ useTransformSecond(newes.create_time) }}
      </template>
      <div class="newest-container-item-describe">
        {{ newes.describe }}
      </div>
      <div class="newest-container-item-footer">
        <a-space size="large">
          <a-space>
            <IconEye />{{ newes.page_views }}
          </a-space>
          <a-space>
            <IconMessage />{{ newes.count }}
          </a-space>
        </a-space>
      </div>
    </a-card>
    <a-card class="newest-container-tools">
      <!-- <a-space direction="vertical"> -->
        <a-input-search placeholder="输入检索条件" />
        <!-- <a-input-search placeholder="输入检索条件" />
        <a-input-search placeholder="输入检索条件" /> -->
      <!-- </a-space> -->
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import ServerApi from "@/api";
import { onMounted, Ref, ref, watchEffect, onActivated, nextTick } from "vue-demi";
import { useTransformSecond } from "@/plugin/transform-time";
import {
  IconEye,
  IconMessage,
  IconClockCircle,
  IconUser,
} from "@arco-design/web-vue/es/icon";
import { onBeforeRouteLeave, useRouter } from "vue-router";
interface NewestType {
  author?: string;
  count?: number;
  create_time?: number;
  describe?: string;
  id?: string;
  page_views?: number;
  title?: string;
  user_name?: string;
}
const router = useRouter();
const newestList: Ref<NewestType[]> = ref([]);
const page = ref(1);
const isArticleEnd = ref(false);
const useGetArticle = async () => {
  try {
    let res = await ServerApi.GetArticleIndex({ page: page.value });
    newestList.value.push(...res.data);
    if (res.data.length < 10) {
      isArticleEnd.value = true;
    } else {
      page.value++;
    }
  } catch (err) {
    console.error(err);
  }
};
useGetArticle();
const useUnregisterEvent = () => {
  refNewestContainer.value.parentElement.scrollTop = 0
  refNewestContainer.value?.parentElement?.removeEventListener(
    "scroll",
    useScrollFunction
  );
};
const useRegisterEvent = () => {
  refNewestContainer.value?.parentElement?.addEventListener(
    "scroll",
    useScrollFunction
  );
};
const useSetScrollTop = () => {
  nextTick(() => {
    refNewestContainer.value.parentElement.scrollTop = scrollTop.value;
  })
};
onMounted(() => {
  useRegisterEvent();
})
onActivated(() => {
  useRegisterEvent();
  if (scrollTop.value) useSetScrollTop();
});
onBeforeRouteLeave((v) => {
  useUnregisterEvent();
});
const refNewestContainer: Ref<any | null> = ref(null);
const scrollTop = ref(0);
const useScrollFunction = ({ target }: any) => {
  if (
    target.scrollTop + target.clientHeight >= target.scrollHeight &&
    !isArticleEnd.value
  ) {
    useGetArticle();
  }
  scrollTop.value = target.scrollTop;
};

const useJumpParticulars = ({ id }: NewestType) => {
  router.push({
    name: "particulars",
    params: { id },
  });
};
</script>

<style lang="scss">
.newest-container {

  // position: relative;
  &-tools {
    position: fixed;
    width: 20%;
    top: 68px;
    right: 10px;
    height: calc(100vh - 68px - 10px);
  }

  &-item {
    margin-top: 10px;
    cursor: pointer;
    position: relative;
    width: calc(80% - 10px);

    &:first-child {
      margin-top: 0px;
    }

    .arco-card-body {
      min-height: 100px;
    }

    &-title {
      .arco-page-header-wrapper {
        padding-left: 0;
      }
    }

    &-describe {
      padding-bottom: 15px;
    }

    &-footer {
      position: absolute;
      bottom: 10px;
      // background-color: green;
      width: calc(100% - 20px);
      right: 10px;
    }
  }
}
</style>