<template>
  <div class="newest">
    <a-card hoverable :bordered="false" class="newest-prefix animate__fadeIn animate__animated" v-show="isPrefixShow"></a-card>
    <div class="newest-box">
      <div class="newest-container" ref="refNewestContainer">
        <a-card hoverable :bordered="false"  v-for="newes in newestList" :key="newes.id" @click="useJumpParticulars(newes)"
          class="newest-container-item !w-1/2">
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
        <div v-if="isShowSearch" class="newest-container-search">
          <a-input-search style="border-radius: 1rem;" size="large" v-model="keyword" @press-enter="usePressEnter"
            class="newest-container-search_input" placeholder="输入检索条件" ref="refSearch" />
        </div>
      </div>
    </div>
    <a-card hoverable :bordered="false" class="newest-suffix  animate__fadeIn animate__animated" :style="suffixStyle">
      <div v-if="isSuffixShow">
        <a-input-search style="border-radius: 1rem;" size="large" v-model="keyword" @press-enter="usePressEnter"
          placeholder="输入检索条件" />
      </div>
      <div class="newest-suffix_bottom">
        <a-switch type="line" v-model="isPrefixShow" v-if="!isSuffixShow" />
        <a-switch type="line" v-model="isSuffixShow" />
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import ServerApi from "@/api";
import { onMounted, Ref, ref, watch, watchEffect, onActivated, nextTick, unref, computed } from "vue-demi";
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
const keyword = ref('')
const isRefresh = ref(false);
const isArticleEnd = ref(false);
const percent = ref(0);

const isPrefixShow = ref(false);
const isSuffixShow = ref(false);

const suffixStyle = computed(() => {
  return !unref(isSuffixShow) && {
    width: '4rem'
  }
})

watch(keyword, () => {
  isRefresh.value = true;
  isArticleEnd.value = false
})

const useGetArticle = async () => {
  try {
    if (isRefresh.value) {
      page.value = 1
      newestList.value.splice(0)
    }
    let res = await ServerApi.GetArticleIndex({ page: page.value, keyword: keyword.value });
    newestList.value.push(...res.data);
    isRefresh.value = false
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
  if (isRefresh.value) {
    scrollTop.value = target.scrollTop;
    return
  }
  if (
    target.scrollTop + target.clientHeight >= target.scrollHeight &&
    !isArticleEnd.value
  ) {
    useGetArticle();
  }
  console.log((target.scrollTop + target.clientHeight) / target.scrollHeight);
  percent.value = Math.floor((target.scrollTop + target.clientHeight) / target.scrollHeight * 100) / 100
  scrollTop.value = target.scrollTop;
};

const useJumpParticulars = ({ id }: NewestType) => {
  router.push({
    name: "particulars",
    params: { id },
  });
};


const isShowSearch = ref(false);

const refSearch = ref<HTMLElement | null>(null)
watch(isShowSearch, () => {
  nextTick(() => {
    unref(refSearch)?.focus()
  })
})
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 27) {
    isShowSearch.value = false
  }

  if (e.ctrlKey && e.keyCode === 70) {
    isShowSearch.value = true
  }
});

const usePressEnter = () => {
  useGetArticle()
  isShowSearch.value = false
}
</script>

<style lang="scss">
.newest {
  display: flex;
  overflow: hidden;

  &-suffix,
  &-prefix {
    width: 20%;
    // background-color: var(--color-bg-3);
    border-radius: .5rem;
    // padding: .5rem;
    // box-sizing: border-box;
  }

  &-prefix {
    margin-right: 5px;
  }

  &-suffix {
    margin-left: 5px;
    position: relative;

    &_bottom {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-flow: 10px;

      &>:nth-child(1n) {
        margin-top: 10px;
      }
    }
  }

  &-box {
    height: calc(100vh - 68px - 10px);
    overflow-y: scroll;
    flex: 1;
    border-radius: .5rem;
  }

  &-container {
    // position: relative;

    // position: relative;
    &-tools {
      // position: fixed;
      width: calc(25% - 10px);
      top: 68px;
      right: 10px;
      height: calc(100vh - 68px - 10px);
      border-radius: .5rem;
      background-color: #fff;
      border: 1px solid var(--color-neutral-3);
      padding: 10px;
      box-sizing: border-box;

    }

    &-search {
      position: fixed;
      width: 100%;
      top: 0;
      right: 0;
      height: 100%;
      z-index: 6;
      background-color: rgba($color: #000000, $alpha: .3);

      &_input {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        max-width: 300px;
      }
    }

    &-item {
      // margin: 10px auto 0;
      margin-top: 10px;
      cursor: pointer;
      position: relative;
      // width: 50%;
      // width: 75%;
      margin: 10px 5px 0;
      border-radius: .5rem;

      // width: calc(80% - 10px);

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
}
</style>