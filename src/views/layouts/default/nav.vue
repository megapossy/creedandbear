<template>
  <nav
    class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">

    <div class="flex h-14 items-center  lg:h-[60px]">
      <CreedAndBearLogoSVG />
    </div>

    <RouterLink class="text-foreground text-xl font-bold transition-colors hover:text-foreground" :to="{ name: 'users' }">
      Home
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import CreedAndBearLogoSVG from "@/assets/images/creed-and-bear-logo-black.svg"

</script>

<style scoped></style>