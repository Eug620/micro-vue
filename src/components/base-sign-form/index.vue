
<!--
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-27 19:04:27
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-16 23:56:38
 * @FilePath: /micro-base/src/components/base-sign-up/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-form :model="signForm" auto-label-width>
    <a-form-item field="name" label="name">
      <a-input
        v-model.trim="signForm.name"
        placeholder="please enter your name..."
      />
    </a-form-item>
    <a-form-item field="password" label="password">
      <a-input-password
        autocomplete="off"
        v-model.trim="signForm.password"
        placeholder="please enter your password..."
        :onPressEnter="useSubmit"
      />
    </a-form-item>
    <a-form-item
      v-show="props.type !== FormType.SignIn"
      field="email"
      label="email"
    >
      <a-input
        v-model.trim="signForm.email"
        placeholder="please enter your email..."
        @onPressEnter="useSubmit"
      />
    </a-form-item>
    <a-form-item>
      <a-button :loading="loading" type="primary" @click="useSubmit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref, unref } from 'vue';
import ServerApi from '@/api';
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
const { getInfo } = storeToRefs(userStore);
const loading = ref(false)
const router = useRouter()
const route = useRoute()
enum FormType {
  InfoEdit = 'InfoEdit',
  SignUp = 'SignUp', // 注册
  SignIn = 'SignIn', // 登陆
}
const props = defineProps<{
  type: FormType;
}>();

const emit = defineEmits(['update:type', 'submitSuccess'])
interface SignFormType {
  name?:string
  password?:string
  email?:string
}
const signForm:SignFormType = reactive(
  props.type === FormType.InfoEdit
    ? Object.assign({},unref(getInfo))
    : {
        name: '',
        password: '',
        email: '',
      },
);

const resetForm = () => {
  signForm.email = '';
  signForm.password = '';
  signForm.name = '';
};

const useSubmit = async () => {
  try {
    loading.value = true
    let res;
    switch (props.type) {
      case FormType.SignIn:
        res = await userStore.login(signForm)
        break;
      case FormType.SignUp:
        res = await ServerApi.UserAdd(signForm)
        break;
      case FormType.InfoEdit:
        res = await ServerApi.UserUpdate(signForm)
        break;
      default:
        break;
    }
    // let res: any = await ServerApi.UserAdd(signForm);
    if (res.code === 200) {
      Notification.success({
        title: props.type,
        content: 'Success',
      });
      if (props.type === FormType.SignUp) {
        emit('update:type', FormType.SignIn)
      } else {
        emit('submitSuccess',)
        console.log('logins',route.query.redirect);
        const redirect:any  = route.query.redirect
        if (redirect) {
          router.push({
            path: decodeURIComponent(redirect)
          })
        } else {
          router.push({
            name: 'dashboard'
          })
        }
      }
    } else {
      Notification.error({
        title: props.type,
        content: res.msg,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
};
</script>

<style>
</style>