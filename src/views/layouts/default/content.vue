<template>
  <div class="h-full flex flex-1 flex-col gap-4 container px-1 mx-auto">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">
        <slot name="title" />
      </h1>
    </div>
    <div class="flex flex-1 justify-center rounded-lg ">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>