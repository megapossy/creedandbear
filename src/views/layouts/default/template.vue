<template>
  <main>
    <router-view v-slot="{ Component }">
      <FadeUp>
        <component :is="Component" />
      </FadeUp>
    </router-view>
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped></style>