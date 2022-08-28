<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 11:52:07
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 19:05:23
 * @FilePath: /micro-chat/src/components/mc-particulars-comment/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mc-particulars-comment">
    <div
      v-for="comment in commentTree"
      :key="comment.id"
      @click="comment.isShow = !comment.isShow"
    >
      <a-comment
        class="particulars-comment animate__lightSpeedInRight animate__animated"
        :content="comment.content"
      >
        <template #datetime>
          <span class="particulars-comment-datetime">
            [ {{ useTransformSecond(comment.create_time) }} ]
          </span>
        </template>
        <template #author>
          <a-space size="large">
            <span :class="[isAuthor(comment.operator)]">
              {{ comment.operator_name }}
            </span>
            <IconToRight />
            <span :class="[isAuthor(comment.tid)]">
              {{ comment.comment_name }}
            </span>
          </a-space>
        </template>
        <template #actions>
          <div
            class="particulars-comment-actions"
            @click.stop="useShowDrawer(comment)"
          >
            <span>
              <IconMessage />
            </span>
            {{ comment.children.length }}
          </div>
        </template>
      </a-comment>
      <template v-if="comment.isShow">
        <a-comment
          class="
            particulars-comment
            animate__lightSpeedInRight animate__animated
          "
          v-for="com in comment.children"
          :key="com.id"
          :content="com.content"
          style="margin-left: 40px"
        >
          <template #datetime>
            <span class="particulars-comment-datetime">
              [ {{ useTransformSecond(com.create_time) }} ]
            </span>
          </template>
          <template #actions>
            <div
              class="particulars-comment-actions"
              @click.stop="useShowDrawer(com)"
            >
              <span>
                <IconMessage />
              </span>
              {{ com.children?.length || 0 }}
            </div>
          </template>
          <template #author>
            <a-space size="large">
              <span :class="[isAuthor(com.operator)]">
                {{ com.operator_name }}
              </span>
              <IconToRight />
              <span :class="[isAuthor(com.tid)]">
                {{ com.comment_name }}
              </span>
            </a-space>
          </template>
        </a-comment>
      </template>
    </div>
  </div>
  <a-drawer
    popup-container=".mc-particulars-comment"
    :visible="isVisibleDrawer"
    @ok="useComment"
    placement="bottom"
    @cancel="isVisibleDrawer = false"
  >
    <template #title> {{ toTarget.title }} </template>
    <a-textarea
      placeholder="Please enter something"
      v-model="toTarget.content"
      allow-clear
    />
  </a-drawer>

  <a-affix :offsetBottom="300" class="mc-particulars-comment-affix">
    <a-button type="primary" shape="circle"  size="large" @click="useCommentAuthor">
      <IconMessage size="20"/>
    </a-button>
  </a-affix>
</template>

<script setup lang="ts">
import ServerApi from "@/api";
import { reactive, ref } from "vue-demi";
import { useRoute } from "vue-router";
import {
  IconMessage,
  IconHeart,
  IconToRight,
} from "@arco-design/web-vue/es/icon";
import { useTransformSecond } from "@/plugin/transform-time";
import { Notification } from "@arco-design/web-vue";
const props: any = defineProps({
  ArticleInfo: Object,
});
const isAuthor = (id: string) => {
  return id === props.ArticleInfo.author ? "is-author" : "";
  //   return "is-author"
};

const commentTree: any[] = ref([]);
const refCommentTree: any = ref(null);
const expandedKeys: any = ref([]);
const isVisibleDrawer = ref(false);
const route = useRoute();

const { id } = route.params;
const useGetComment = async () => {
  try {
    let res = await ServerApi.CommentAll({ article_id: id });
    console.log(res);
    commentTree.value = res.data;
  } catch (error) {}
};
useGetComment();

const useCommentAuthor = () => {
    toTarget.title =  `回复: ${props.ArticleInfo.user_name}`;
    toTarget.pid =  props.ArticleInfo.id
    toTarget.tid =  props.ArticleInfo.author
    toTarget.article_id =  props.ArticleInfo.id
    isVisibleDrawer.value = true;
}

const toTarget = reactive({
  title: "",
  content: "",
  pid: "",
  tid: "",
  article_id: "",
});

// pid -> 提交的pid
// operator -> 提价的tid
const useShowDrawer = ({
  article_id,
  id,
  pid,
  operator,
  operator_name,
}: any) => {
  // 一级评论,此时评论应该在这条评论之下,所用id
  if (pid === props.ArticleInfo.id) {
    console.log("一级评论");
    toTarget.pid = id;
  } else {
    console.log("二级评论");
    toTarget.pid = pid;
  }
  toTarget.title = `回复: ${operator_name}`;
  toTarget.tid = operator;
  toTarget.article_id = article_id;
  isVisibleDrawer.value = true;
  console.log(toTarget);
};
const useComment = async () => {
  try {
    let res: any = await ServerApi.CommentAdd(toTarget);
    if (res.code === 200) {
      Notification.success({
        title: "Success",
        content: res.msg,
      });
      isVisibleDrawer.value = false;
      toTarget.content = "";
      useGetComment();
    } else {
      console.log(res);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss">
.particulars-comment {
  cursor: pointer;
  background-color: var(--color-neutral-1);
  border-radius: 20px;
  overflow: hidden;

  &:hover {
  }

  &:hover &-datetime {
    color: rgb(var(--primary-6));
  }

  &-datetime {
    float: right;
  }

  &-actions {
    display: inline-block;
    &:hover {
      color: rgb(var(--primary-6));
    }
    // background-color: red;
  }
}
.arco-comment {
  padding: 10px 20px;
  margin-bottom: 10px;
  &:hover {
    & > span {
      color: rgb(var(--primary-6)) !important;
    }
  }
}
.arco-comment:not(:first-of-type) {
  margin-top: 0;
}

.is-author {
  color: rgb(var(--primary-6));
}
.mc-particulars-comment-affix{
    .arco-affix{
        text-align: right;
    }
}
</style>