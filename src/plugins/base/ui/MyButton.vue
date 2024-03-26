<template>
  <button type="button" :disabled="isLoading" :class="btnClass" :style="{
    opacity: isLoading ? '0.7' : 'initial'
  }">
    <slot />
    <SVGLoading v-if="isLoading" class="h-[15px] w-[15px] inline text-white animate-spin dark:text-white ms-2 " />
  </button>
</template>

<script setup lang="ts">
import { cn } from "@/utils/helpers";
import SVGLoading from "../icons/loading-blue.svg"
const props = withDefaults(defineProps<{ isLoading: boolean, class?: string }>(), {
  isLoading: false
})

const btnClassDef = 'text-white flex justify-center items-center  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center'
const btnClass = cn(btnClassDef, props.class);

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