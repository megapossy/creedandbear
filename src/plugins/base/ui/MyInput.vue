<template>
  <div>
    <div class="relative z-0 w-full group">
      <input v-focus :value="$props.modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value + '')" type="text"
        :name="$props.label" :id="$props.label"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer"
        :class="[$props.error ? '!text-red-600 !border-red-300 focus:!border-red-600' : '']" placeholder=" " />

      <label :for="$props.label"
        class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        :class="[$props.error?.length ? '!text-red-600 peer-focus:!text-red-600' : '']">{{ $props.label }}</label>
    </div>
    <p v-if="$props.error" class="mt-2 text-xs text-red-600">
      {{ $props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  'modelValue': string,
  'error'?: string,
  'focus'?: boolean,
  'label': string,
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()


const vFocus = {
  mounted: (el:HTMLInputElement) => {
    if (props.focus) {
      console.log('focusing')
      el.focus()
    }
  }
}
</script>
<script lang="ts">
import MyInput from "./MyInput.vue"
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MyInput: typeof MyInput;
  }
}
</script>

<style scoped></style>