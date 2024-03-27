<template>
  <main>
    <div
      className="container px-0 relative h-screen flex-col items-center justify-center lg:max-w-none lg:grid lg:grid-cols-2 lg:px-0">
      <div className="relative h-[170px] lg:h-full flex-col bg-muted p-10 text-white lg:flex lg:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img :src="CreedAndBearLogo" />
        </div>
      </div>
      <div className="md:p-8">
        <router-view v-slot="{ Component }">
          <FadeUp>
            <component :is="Component" />
          </FadeUp>
        </router-view>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CreedAndBearLogo from "@/assets/images/creed-and-bear-logo.webp"

</script>

<style scoped></style>