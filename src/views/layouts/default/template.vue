<template>

  <div class="flex min-h-screen w-full flex-col">
    <header class="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-[1] bg-white">
      <Nav />
      <NavMobile />
      <Profile />
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <router-view v-slot="{ Component }">
        <FadeUp>
          <component :is="Component" />
        </FadeUp>
      </router-view>
    </main>
    <Teleport to="#toast-section">
      <Toaster duration="100000" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import NavMobile from './nav-mobile.vue';
import Nav from './nav.vue';
import Profile from './profile.vue';

import Toaster from '@/views/components/shadcn/ui/toast/Toaster.vue'

</script>

<style scoped></style>