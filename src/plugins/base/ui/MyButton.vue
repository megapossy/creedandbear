<template>
  <button type="button" :disabled="isLoading || props.disabled" :class="btnClass">
    <slot />
    <SVGLoading v-if="isLoading" class="h-[15px] w-[15px] inline text-white animate-spin dark:text-white ms-2 " />
  </button>
</template>

<script setup lang="ts">
import { cn } from "@/utils/helpers";
import SVGLoading from "../icons/loading-blue.svg"
const props = withDefaults(defineProps<{
  isLoading: boolean,
  disabled: boolean,
  class?: string,
  btnType: 'standard' | 'danger'
}>(), {
  isLoading: false,
  disabled: false,
  btnType: 'standard'
})

const btnClassDef = 'text-white flex justify-center items-center   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full px-5 py-2.5 text-center disabled:opacity-70'
const clr = {
  standard: 'bg-black',
  danger: 'bg-red-500'
}
const btnClassColor = clr[props.btnType]
const btnClass = cn(btnClassDef + ` ${btnClassColor}`, props.class);



</script>
<script lang="ts">
import MyButton from "./MyButton.vue"
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MyButton: typeof MyButton;
  }
}
</script>

<style scoped></style>