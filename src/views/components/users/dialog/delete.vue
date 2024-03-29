<template>
  <Dialog v-model:open="isShown">
    <DialogContent to="#modal-section" 
    class="max-w-[415px] sm:max-w-[625px] bg-white" 
    @open-auto-focus="(e) => {
      e.preventDefault();
    }">
      <DialogHeader>
        <DialogTitle class="text-2xl text-left flex items-center">
          <Trash2 class="me-3" /> Delete User
        </DialogTitle>

      </DialogHeader>
      <div class="flex flex-col sm:flex-row ">
        <div class="w-44 my-4 flex items-center justify-center mx-auto sm:mx-0">
          <div class="h-28 w-28 min-w-28 mb-2 rounded-full overflow-hidden border-2
          flex items-center justify-center">
            <img v-if="userData?.avatar" class="h-28 w-28 min-w-28" :src="userData.avatar" />
            <CircleUser v-else class="h-28 w-28 min-w-28" />
          </div>
        </div>
        <div class="flex flex-col space-y-2 py-4">
          <div class="flex flex-col">
            <Label for="name" class="">
              First Name
            </Label>
            <p class="text-wrap break-all font-bold text-xl">{{ userData?.first_name }}</p>
          </div>
          <div class="flex flex-col">
            <Label for="name" class="">
              Last Name
            </Label>
            <p class="text-wrap break-all font-bold text-xl">{{ userData?.last_name }}</p>
          </div>
          <div class="flex flex-col">
            <Label for="name" class="">
              Email
            </Label>
            <p class="text-wrap break-all font-bold text-xl">{{ userData?.email }}</p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <div>
          <p class="text-2xl mt-6 mb-4 text-center  text-red-500">
            Are you sure you want to delete user?
          </p>
        </div>

        <div class="flex flex-row justify-between items-center w-full">
          <MyButton data-testid="no-btn" class="bg-black w-2/5" type="button" @click="isShown = false" :is-loading="isLoading">
            No
          </MyButton>
          <MyButton data-testid="yes-btn" class="bg-red-500 w-2/5" type="button" @click="onSubmit" :is-loading="isLoading">
            Yes!
          </MyButton>
        </div>

        <p  v-if="errorText" class="text-red-500 text-center pt-8 pb-0">
          <span>{{ errorText }}</span>
        </p>        
      </DialogFooter>
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
import { Trash2 } from 'lucide-vue-next';
import { z } from 'zod'
import { useToast } from '@/views/components/shadcn/ui/toast/use-toast'

import { type User } from '@/services/user/User';
import { computed, ref, watch } from 'vue';
import { type Action } from "@/composables/userModalProvider"
const { toast } = useToast();

const props = defineProps<{
  user: User | undefined,
  action?: Action
}>()

const isShown = ref(false)
watch([() => props.user, () => props.action], ([nUser, nAction]) => {
  errorText.value = ""
  if (nUser && nAction == 'delete') isShown.value = true;
  else isShown.value = false
})
const userData = computed(() => props.user?.data)


const isLoading = ref(false)
const errorText = ref('')
async function onSubmit() {
  try {
    isLoading.value = true
    errorText.value = ""
    const old = {
      ...userData.value
    }    
    await props.user?.delete()
    toast({
      title: 'User deleted!',
      description: `${old?.first_name} ${old?.last_name} was removed.`,
    });
    isShown.value = false
    isLoading.value = false
  } catch (error: any) {
    isLoading.value = false
    errorText.value = error.message
  }
}

</script>

<style scoped></style>