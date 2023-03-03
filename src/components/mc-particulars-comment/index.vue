<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 11:52:07
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 19:42:45
 * @FilePath: /micro-chat/src/components/mc-particulars-comment/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mc-particulars-comment animate__fadeIn  animate__animated">
    <!-- <h2 style="display:inline-block;font-size:1.5em;" v-if="ArticleInfo">
                    {{ ArticleInfo.title }} - {{ ArticleInfo.user_name }} : {{ ArticleInfo.page_views }}
                  </h2> -->
    <div style="text-align: right;padding-bottom: 10px;">
      <a-button type="text" @click="useCommentAuthor">
        <!-- 回复作者 -->
        {{ $t('pages.particulars.reply') }}
      </a-button>
    </div>
    <!-- <a-divider /> -->
    <div v-for="comment in commentTree" :key="comment.id">
      <a-comment class="particulars-comment animate__fadeInRight animate__animated">
        <template #datetime>
          <span class="particulars-comment-datetime">
            <!-- [ {{ useTransformSecond(comment.create_time) }} ] -->
          </span>
        </template>
        <template #author>
          <a-space size="small">
            <div class="particulars-comment-author">
              <a-avatar :size="24">
                <img v-if="comment.operator_avatar" alt="avatar" :src="comment.operator_avatar" />
                <template v-else>
                  <IconUser />
                </template>
              </a-avatar>
              <span :class="[isAuthor(comment.operator)]">
                {{ comment.operator_name }}
              </span>
            </div>
            <!-- <IconCaretRight />
                <div class="particulars-comment-author">
                  <a-avatar :size="24">
                    <img v-if="comment.comment_avatar" alt="avatar" :src="comment.comment_avatar" />
                    <template v-else>
                      <IconUser />
                    </template>
                  </a-avatar>
                  <span :class="[isAuthor(comment.tid)]">
                    {{ comment.comment_name }}
                  </span>
                </div> -->
          </a-space>
        </template>
        <template #content>
          {{ comment.content }}
        </template>
        <template #actions>
          <div class="particulars-comment-actions">
            <span @click.stop="useShowDrawer(comment)">
              <IconMessage />
            </span>
            {{ comment.children.length }}
            <span v-if="comment.children.length" style="margin-left: 4px;">
              <IconUp v-if="comment.isShow" @click="comment.isShow = !comment.isShow" />
              <IconDown v-else @click="comment.isShow = !comment.isShow" />
            </span>
            <div style="float:right;font-size: 12px;;" class="particulars-comment-datetime">
              {{ useTransformSecond(comment.create_time) }}
            </div>
          </div>
        </template>
      </a-comment>
      <template v-if="comment.isShow">
        <a-comment class="
                          particulars-comment
                          animate__fadeInRight  animate__animated
                        " v-for="com in comment.children" :key="com.id" :content="com.content" style="margin-left: 40px">
          <template #datetime>
            <span class="particulars-comment-datetime">
              <!-- [ {{ useTransformSecond(com.create_time) }} ] -->
            </span>
          </template>
          <template #actions>
            <div class="particulars-comment-actions">
              <span @click.stop="useShowDrawer(com)">
                <IconMessage />
              </span>
              <!-- {{ com.children?.length || 0 }} -->
              <div style="float:right;font-size: 12px;" class="particulars-comment-datetime">
                {{ useTransformSecond(com.create_time) }}
              </div>
            </div>
          </template>
          <template #author>
            <a-space size="small">
              <div class="particulars-comment-author">
                <a-avatar :size="24">
                  <img v-if="com.operator_avatar" alt="avatar" :src="com.operator_avatar" />
                  <template v-else>
                    <IconUser />
                  </template>
                </a-avatar>
                <span :class="[isAuthor(com.operator)]">
                  {{ com.operator_name }}
                </span>
              </div>
              <IconCaretRight />
              <div class="particulars-comment-author">
                <a-avatar :size="24">
                  <img v-if="com.comment_avatar" alt="avatar" :src="com.comment_avatar" />
                  <template v-else>
                    <IconUser />
                  </template>
                </a-avatar>
                <span :class="[isAuthor(com.tid)]">
                  {{ com.comment_name }}
                </span>
              </div>
            </a-space>
          </template>
        </a-comment>
      </template>
    </div>
    <a-result status="warning" title="暂无评论信息" v-if="!commentTree.length">
      <template #icon>
        <IconMessageBanned />
      </template>
      <template #subtitle>
        快来添加一条吧
      </template>
      <template #extra>
        <a-space>
          <!-- <a-button type='primary'>Back</a-button> -->
        </a-space>
      </template>
    </a-result>
  </div>
  <a-drawer :ok-text="$t('button.confirm')" :cancel-text="$t('button.cancel')" :visible="isVisibleDrawer" @ok="useComment"
    placement="bottom" @cancel="useDrawerCancel">
    <template #title> {{ $t('pages.particulars.reply') }} : {{ toTarget.title }} </template>
    <a-textarea placeholder="Please enter something" v-model="toTarget.content" allow-clear />
  </a-drawer>
</template>

<script setup lang="ts">
import ServerApi from "@/api";
import { reactive, ref } from "vue-demi";
import { useRoute } from "vue-router";
import {
  IconMessage,
  IconHeart,
  IconCaretRight,
  IconMessageBanned,
  IconUser,
  IconDown,
  IconUp
} from "@arco-design/web-vue/es/icon";
import { useTransformSecond } from "@/plugin/transform-time";
import { Notification } from "@arco-design/web-vue";
import i18n from '@/locales/i18n';

const props: any = defineProps({
  ArticleInfo: Object,
});
const isAuthor = (id: string) => {
  return id === props.ArticleInfo.author ? "is-author" : "";
  //   return "is-author"
};

const commentTree: any = ref([]);
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
  } catch (error) { }
};
useGetComment();

const useDrawerCancel = () => {
  isVisibleDrawer.value = false
  toTarget.content = ''
}

const useCommentAuthor = () => {
  toTarget.title = props.ArticleInfo.user_name
  toTarget.pid = props.ArticleInfo.id
  toTarget.tid = props.ArticleInfo.author
  toTarget.article_id = props.ArticleInfo.id
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
  toTarget.title = operator_name
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

  .arco-comment-inner {
    width: 100%;

    .arco-comment-content {
      padding-left: 14px;
      margin-top: 10px;
    }
  }

  &:hover {}

  &:hover &-datetime {
    color: rgb(var(--primary-6));
  }

  &-datetime {
    float: right;
    font-size: 12px;
  }

  &-author {
    :nth-child(2) {
      padding-left: 6px;
    }
  }

  &-actions {

    // display: inline-block;
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
    &>span {
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

.mc-particulars-comment-affix {
  .arco-affix {
    text-align: right;
  }
}
</style>