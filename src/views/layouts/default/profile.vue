<template>
  <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
    <div class="ml-auto flex-1 sm:flex-initial">
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" size="icon" class="rounded-full overflow-hidden border-2">
          <img v-if="Auth.data?.avatar" class="h-8 w-8"  :src="Auth.data?.avatar" />
          <CircleUser v-else class="h-8 w-8" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel class="text-xl font-bold">
          {{ Auth.data?.first_name }}
          {{ Auth.data?.last_name }}
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div class="flex space-x-2">
            <AtSign />
            <span class="opacity-60">
              {{ Auth.data?.email }}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="flex">
          <RouterLink class="flex-1" :to="{ name: 'logout' }">
            Logout
          </RouterLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { Auth } from '@/services/auth/Auth';
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/views/components/shadcn/ui/dropdown-menu';
import { CircleUser, AtSign } from 'lucide-vue-next';



</script>

<style scoped></style>