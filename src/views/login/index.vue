<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-25 14:52:51
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 04:00:24
 * @FilePath: /micro-base/src/pages/menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <a-card title="User">
      <template #extra>
        <template v-if="!userStore.isLogin">
          <a-radio-group v-model="position" type="button">
            <a-radio value="SignIn">Sign in</a-radio>
            <a-radio value="SignUp">Sign up</a-radio>
          </a-radio-group>
        </template>
        <template v-else>
          <base-edit-info  v-model:value="isInfoEdit" @update:value="isInfoEdit"/>
          <a-divider direction="vertical" />
          <base-sign-out/>
          <a-divider direction="vertical" />
          <base-draw-down/>
        </template>
      </template>
      <template v-if="!userStore.isLogin">
        <base-sign-form v-model:type="position"/>
      </template>
      <template v-else>
        <base-user-info v-model:value="isInfoEdit"/>
      </template>
    </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const position = ref('SignIn');
const isInfoEdit = ref(false)
</script>

<style lang="scss">

</style>