<template>
  <label @click="() => {
    if (!$props.isLoading)
      $emit('update:modelValue', !$props.modelValue)
  }" class="relative inline-flex items-center cursor-pointer" :class="{
  disabled: $props.isLoading
}">
    <div class="toggle-box" :class="{
      toggled: $props.modelValue
    }">
    </div>
    <slot />
    <SVGLoading v-if="isLoading" class="h-[1rem] w-[1rem] inline text-gray-200 animate-spin dark:text-gray-600 ms-2" />
  </label>
</template>

<script setup lang="ts">
import SVGLoading from "../icons/loading-blue.svg"

withDefaults(defineProps<{ 'modelValue': boolean, isLoading: boolean }>(), {
  modelValue: false,
  isLoading: false,
})
defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
<script lang="ts">
import ToggleBox from "./ToggleBox.vue"
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ToggleBox: typeof ToggleBox;
  }
}
</script>

<style lang="scss" scoped>
.toggle-box {
  @apply w-11 h-6 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-[3px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all;
}

.toggled {
  @apply outline-none ring-1 ring-blue-300 after:translate-x-full after:border-white bg-blue-600;
}

.disabled {
  .toggle-box {
    opacity: 0.5;
  }
}

label {
  user-select: none;
}
</style>