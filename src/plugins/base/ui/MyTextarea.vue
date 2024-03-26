<template>
  <div class="">
    <textarea :value="$props.modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value+'')" type="text" :name="$props.label" :id="$props.label" rows="3"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-blue-600"
      :class="[$props.error ? '!text-red-600 !border-red-300 focus:!outline-red-600 !outline-red-600' : '']"
      :placeholder="$props.label"></textarea>
    <p v-if="$props.error" class="mt-2 text-xs text-red-600">
      {{ $props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  'modelValue': string,
  'error'?: string,
  'label': string,
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
<script lang="ts">
import MyTextarea from "./MyTextarea.vue"
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MyTextarea: typeof MyTextarea;
  }
}
</script>
<style scoped></style>