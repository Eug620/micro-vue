<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-10 18:19:27
 * @FilePath     : /micro-vue/src/views/about/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
-->
<template>
  <mc-container>
    <a-card :title="$t('pages.about.userInfo')">
      <template #extra>
        <template v-if="!userStore.isLogin">
          <a-radio-group v-model="position" type="button">
            <a-radio value="SignIn">{{ $t('button.signIn') }}</a-radio>
            <a-radio value="SignUp">{{ $t('button.signUp') }}</a-radio>
          </a-radio-group>
        </template>
        <template v-else>
          <base-edit-info v-model:value="isInfoEdit" @update:value="isInfoEdit" />
          <a-divider direction="vertical" />
          <base-sign-out />
          <!-- <a-divider direction="vertical" />
              <base-draw-down/> -->
        </template>
      </template>
      <template v-if="!userStore.isLogin">
        <base-sign-form v-model:type="position" />
      </template>
      <template v-else>
        <base-user-info v-model:value="isInfoEdit" />
      </template>

      <a-table :pagination="false" :scroll="{ maxHeight: 440 }" class="VisitorInfoTable mt-4" :bordered="{ cell: true }"
        :columns="columns" :data="data" />
    </a-card>
  </mc-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import ServerApi from '@/api';
import { TableColumnData } from '@arco-design/web-vue';

const userStore = useUserStore();
const position = ref('SignIn');
const isInfoEdit = ref(false)

const columns: TableColumnData[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 100,
    tooltip: true,
    ellipsis: true
  },
  // {
  //   title: '用户ID',
  //   dataIndex: 'user',
  // },
  // {
  //   title: '用户名称',
  //   dataIndex: 'user_name',
  // },
  {
    title: 'IP',
    dataIndex: 'ip',
    width: 150,
    fixed: 'left',
  },
  {
    title: '地区',
    dataIndex: 'location',
    fixed: 'left',
    width: 130
  },
  {
    title: '系统',
    dataIndex: 'system_name',
    width: 100

  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    width: 100

  },
  {
    title: '浏览器版本',
    dataIndex: 'browser_ver',
    width: 130

  },
  {
    title: '风力',
    dataIndex: 'fl',
    width: 150

  },
  {
    title: '天气',
    dataIndex: 'tq',
    width: 100

  },
  {
    title: '最高气温',
    dataIndex: 'high',
    width: 100

  },
  {
    title: '最低气温',
    dataIndex: 'low',
    width: 100

  },
  {
    title: '星期',
    dataIndex: 'week',
    width: 100

  },
  {
    title: '建议',
    dataIndex: 'tip',
    width: 400

  },
  {
    title: '日期',
    dataIndex: 'time',
    fixed: 'right',
    width: 180
  },
]
const data = ref([])

const useGetTableData = async () => {
  try {
    let res = await ServerApi.VisitorInfoIndex({
      size: 99999999
    })
    data.value = res.data
  } catch (e) { }
}

useGetTableData()
</script>

<style lang="scss">
.VisitorInfoTable {

  .arco-spin {
    height: auto !important;
  }
}
</style>