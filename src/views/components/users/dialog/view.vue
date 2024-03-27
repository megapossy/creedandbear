<template>
  <Dialog v-model:open="isShown">
    <DialogContent to="#modal-section" class="max-w-[415px] sm:max-w-[625px] bg-white">
      <DialogHeader>
        <DialogTitle class="text-2xl text-left flex items-center">
          <Search class="me-3" /> View Profile
        </DialogTitle>

      </DialogHeader>
      <div class="flex flex-col-reverse">
        <div class="flex flex-col space-y-2 py-4">
          <div class="grid grid-cols-5 items-center gap-4">
            <Label for="name" class="text-right col-span-2 md:col-span-1">
              First Name:
            </Label>
            <p class=" font-bold">{{ userData?.first_name }}</p>
          </div>
          <div class="grid grid-cols-5 items-center gap-4">
            <Label for="name" class="text-right col-span-2 md:col-span-1">
              Last Name:
            </Label>
            <p class=" font-bold">{{ userData?.last_name }}</p>
          </div>
          <div class="grid grid-cols-5 items-center gap-4">
            <Label for="name" class="text-right col-span-2 md:col-span-1">
              Email:
            </Label>
            <p class=" font-bold">{{ userData?.email }}</p>
          </div>
        </div>
        <div class="flex-1 min-w-28 flex items-center justify-center">
          <div class="h-28 w-28 min-w-28 mb-2 rounded-full overflow-hidden border-2
        flex items-center justify-center
        ">
            <img v-if="userData?.avatar" class="h-28 w-28 min-w-28" :src="userData.avatar" />
            <CircleUser v-else class="h-28 w-28 min-w-28" />
          </div>
        </div>
      </div>
      <!-- <DialogFooter>
        <MyButton type="submit">
          Delete
        </MyButton>
      </DialogFooter> -->
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/views/components/shadcn/ui/dialog';
import { Search } from 'lucide-vue-next';

import { type User } from '@/services/user/User';
import { computed, ref, watch } from 'vue';
import { type Action } from "@/composables/userModalProvider"

const props = defineProps<{
  user: User | undefined,
  action?: Action
}>()

const isShown = ref(false)
watch([() => props.user, () => props.action], ([nUser, nAction]) => {
  if (nUser && nAction == 'view') isShown.value = true;
  else isShown.value = false
})
const userData = computed(() => props.user?.data)

</script>

<style scoped></style>