<!--
 * @Author       : Eug
 * @Date         : 2022-04-22 14:27:12
 * @LastEditTime : 2022-04-22 18:31:56
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /github/micro-base/src/components/base-switch/index.vue
-->
<template>
  <div
    @click="useSwitchClick"
    class="w-10 h-5 rounded-full flex px-0.5 items-center grid ease-in-out duration-300"
    :class="[
      'animate__fadeInLeft',
      useProsValue && 'justify-items-end',
      disabled
        ? useProsValue
          ? 'bg-blue-300'
          : 'bg-gray-300'
        : useProsValue
        ? 'bg-blue-400'
        : 'bg-gray-400',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <div
      class="animate__animated animate__faster w-4 h-4 bg-white rounded-full dark:bg-black text-center items-center"
      :class="[
        useProsValue ? 'animate__slideInLeft' : 'animate__slideInRight',
        loading && 'animate__rotateIn',
      ]"
    >
      <template v-if="loading">
        <i class="fas fa-spinner animate-spin"></i>
      </template>
      <template v-if="!loading">
        <slot />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
// import { defineProps, defineEmits, computed } from "vue";
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'base-switch',
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    readonley: {
      type: [Boolean],
      default: false,
    },
    disabled: {
      type: [Boolean],
      default: false,
    },
    loading: {
      type: [Boolean],
      default: false,
    },
  },
  setup(props, { emit }) {
    const useProsValue = computed(() => {
      return props.value || props.modelValue;
    });
    const useSwitchClick = () => {
      if (!props.readonley && !props.disabled) {
        emit('change', !useProsValue.value);
        emit('update:modelValue', !useProsValue.value);
      }
    };
    return {
      useProsValue,
      useSwitchClick,
    };
  },
});
// defineOptions({
//   name: "base-switch"
// });
// const props = defineProps({
//   modelValue: {
//     type: [Boolean, String, Number],
//     default: false
//   },
//   value: {
//     type: [Boolean, String, Number],
//     default: false
//   },
//   readonley: {
//     type: [Boolean],
//     default: false
//   },
//   disabled: {
//     type: [Boolean],
//     default: false
//   },
//   loading: {
//     type: [Boolean],
//     default: false
//   }
// });

// const useProsValue = computed(() => {
//   return props.value || props.modelValue;
// });
// console.log(props);
// const emit = defineEmits<{
//   (e: "update:modelValue", value: Boolean): void;
//   (e: "change", value: Boolean): void;
// }>();

// const useSwitchClick = () => {
//   if (!props.readonley && !props.disabled) {
//     emit("change", !useProsValue.value);
//     emit("update:modelValue", !useProsValue.value);
//   }
// };
</script>

<style lang="scss"></style>
