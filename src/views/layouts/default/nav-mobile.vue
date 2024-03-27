<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="h-5 w-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav class="grid gap-6 text-lg font-medium pt-14">
        <div class="flex h-14 items-center  bg-black px-4 lg:h-[60px] lg:px-6
        absolute top-0 left-0 w-[101%]">
          <img class="h-full w-auto p-4" :src="CreedAndBearLogo" />
        </div>

        <SheetTrigger as-child>
          <RouterLink class="hover:text-foreground" :to="{ name: 'users' }">
            Users
          </RouterLink>
        </SheetTrigger>
      </nav>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import CreedAndBearLogo from "@/assets/images/creed-and-bear-logo.webp";
import { Button } from '@/views/components/shadcn/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/views/components/shadcn/ui/sheet';
import { Menu } from 'lucide-vue-next';

</script>

<style scoped></style>