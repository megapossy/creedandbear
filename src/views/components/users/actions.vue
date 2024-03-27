<template>
  <div class="flex justify-end space-x-4">
    <div @click="handleCLick('view')" class="cursor-pointer">
      <Search />
    </div>
    <div @click="handleCLick('edit')" class="cursor-pointer">
      <SquarePen />
    </div>
    <div @click="handleCLick('delete')" class="cursor-pointer">
      <Trash2 />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, SquarePen, Trash2 } from 'lucide-vue-next';
import type { User } from '@/services/user/User';
import {  type Action } from "@/composables/userModalProvider"
import { injector } from "@/composables/userModalProvider"
const showUserModal = injector();
const props = defineProps<{
  user: User
}>()


const handleCLick = (action: Action) => {
  if (props.user?.data?.id)
    showUserModal?.(props.user.data.id, action)
}
</script>

<style scoped></style>