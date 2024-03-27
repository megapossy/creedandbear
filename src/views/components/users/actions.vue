<template>
  <div class="flex justify-end space-x-4" :class="{
    'opacity-30 cursor-default': isLoadingFetchUser,
    'cursor-pointer': !isLoadingFetchUser,
  }">
    <div @click="handleCLick('view')" class="">
      <Search />
    </div>
    <div @click="handleCLick('edit')" class="">
      <SquarePen />
    </div>
    <div @click="handleCLick('delete')" class="">
      <Trash2 />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, SquarePen, Trash2 } from 'lucide-vue-next';
import type { User } from '@/services/user/User';
import { type Action } from "@/composables/userModalProvider"
import { injector } from "@/composables/userModalProvider"
import { inject, ref } from 'vue'
const showUserModal = injector();
const props = defineProps<{
  user: User
}>()

const isLoadingFetchUser = inject('isLoadingFetchUser', ref(false))

const handleCLick = (action: Action) => {

  if (isLoadingFetchUser.value) return

  if (props.user?.data?.id)
    showUserModal?.(props.user.data.id, action)
}

</script>

<style scoped></style>