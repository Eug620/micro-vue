<template>
  <a-form ref="refSignForm" :model="signForm" auto-label-width>
    <a-form-item class="!items-center" :rules="signFormRules.avatar" v-if="props.type !== FormType.SignIn" field="avatar"
      :label="$t('pages.about.avatar')">
      <template #label>
        <BaseIconFont type="eug-icon-tupian" :size="20" />
      </template>
      <a-input v-model.trim="signForm.avatar" :placeholder="`${$t('placeholder.enter')}${$t('pages.about.avatar')}`" />
    </a-form-item>
    <a-form-item class="!items-center" :rules="signFormRules.name" v-if="props.type !== FormType.InfoEdit" field="name"
      :label="$t('pages.about.name')">
      <template #label>
        <BaseIconFont type="eug-icon-touxiang" :size="20" />
      </template>
      <a-input v-model.trim="signForm.name"
        :placeholder="`${$t('placeholder.enter')}${$t('pages.about.name')}${(props.type === FormType.SignIn) ? ' | admin' : ''}`" />
    </a-form-item>
    <a-form-item class="!items-center" :rules="signFormRules.password" field="password"
      :label="$t('pages.about.password')">
      <template #label>
        <BaseIconFont type="eug-icon-mima" :size="20" />
      </template>
      <a-input-password autocomplete="off" v-model.trim="signForm.password"
        :placeholder="`${$t('placeholder.enter')}${$t('pages.about.password')}${(props.type === FormType.SignIn) ? ' | admin' : ''}`"
        :onPressEnter="props.type === FormType.SignIn && useSubmit" />
    </a-form-item>
    <a-form-item class="!items-center" :rules="signFormRules.email" v-if="props.type !== FormType.SignIn" field="email"
      :label="$t('pages.about.email')">
      <template #label>
        <BaseIconFont type="eug-icon-MAILBOX" :size="20" />
      </template>
      <a-input v-model.trim="signForm.email" :placeholder="`${$t('placeholder.enter')}${$t('pages.about.email')}`"
        @onPressEnter="useSubmit" />
    </a-form-item>
    <a-form-item>
      <a-button shape="round" :loading="loading" type="primary" @click="useSubmit">{{ $t('button.submit') }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, Ref, ref, unref } from 'vue';
import ServerApi from '@/api';
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import { FormInstance, Notification } from '@arco-design/web-vue';
import { useRoute, useRouter } from 'vue-router';
import BaseIconFont from '@/components/base-icon-font';
import i18n from '@/locales/i18n';

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
  name?: string
  password?: string
  email?: string
  avatar?: string
}
const refSignForm = ref<FormInstance>()
const signForm: SignFormType = reactive(
  props.type === FormType.InfoEdit
    ? Object.assign({}, unref(getInfo))
    : {
      name: '',
      password: '',
      email: '',
    },
);

const signFormRules = reactive({
  avatar: [
    // { required: false, message: `${i18n.global.t('pages.about.avatar')}是必填项` },
    // {
    //   match: /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i,
    //   message: `非法格式${i18n.global.t('pages.about.avatar')},请输入正确的网络图片地址`
    // }
  ],
  name: [
    { required: true, message: `${i18n.global.t('pages.about.name')}是必填项` },
    { maxLength: 20, message: `${i18n.global.t('pages.about.name')}最大长度20` },
    { minLength: 1, message: `${i18n.global.t('pages.about.name')}最小长度1` },
    // {
    //   match: /^[a-zA-Z]\w{4,15}$/,
    //   message: '4至16位,允许字母数字下划线,请以字母开头'
    // }
  ],
  password: [
    { required: true, message: `${i18n.global.t('pages.about.password')}是必填项` },
    { maxLength: 20, message: `${i18n.global.t('pages.about.password')}最大长度20` },
    { minLength: 3, message: `${i18n.global.t('pages.about.password')}最小长度3` },
    // {
    //   match: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/,
    //   message: '最少6位,最少包含1个大写、1个小写、1个数字'
    // }
  ],
  email: [
    { required: true, message: `${i18n.global.t('pages.about.email')}是必填项` },
    {
      match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: `非法格式${i18n.global.t('pages.about.email')},请输入正确的邮箱地址`
    }
  ],
})

const resetForm = () => {
  signForm.email = '';
  signForm.password = '';
  signForm.name = '';
};

const useSubmit = async () => {
  try {
    loading.value = true
    const errors = await unref(refSignForm)?.validate()
    if (errors) return

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
        console.log('logins', route.query.redirect);
        const redirect: any = route.query.redirect
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

<style></style>