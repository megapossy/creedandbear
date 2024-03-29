<template>
  <Dialog v-model:open="isShown">
    <DialogContent to="#modal-section" class="max-w-[415px] sm:max-w-[625px] bg-white" @open-auto-focus="(e) => {
    e.preventDefault();
  }">
      <DialogHeader>
        <DialogTitle class="text-2xl text-left flex items-center">
          <SquarePen class="me-3" /> Edit Profile
        </DialogTitle>

      </DialogHeader>
      <div class="flex flex-col-reverse">
        <div class="flex flex-col space-y-2 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              First Name:
            </Label>
            <p class="col-span-3 font-bold">{{ userData?.first_name }}</p>
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              Last Name:
            </Label>
            <p class="col-span-3 font-bold">{{ userData?.last_name }}</p>
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              Email:
            </Label>
            <p class="col-span-3 font-bold">{{ userData?.email }}</p>
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

      <div class="flex flex-col space-y-8 py-4 mb-4">
        <div class="flex flex-col">
          <MyInput data-testid="first_name" v-model="formData.first_name" :error="formError.first_name" label="First Name" />
        </div>
        <div class="flex flex-col">
          <MyInput data-testid="last_name" v-model="formData.last_name" :error="formError.last_name" label="Last Name" />
        </div>
        <div class="flex flex-col">
          <MyInput data-testid="email" v-model="formData.email" :error="formError.email" label="Email" />
        </div>
      </div>

      <DialogFooter>
        <div class="flex flex-row justify-between items-center w-full">
          <p class="text-red-500 pe-2">
            <span v-if="errorText">{{ errorText }}</span>
          </p>
          <div>
            <MyButton data-testid="update-btn" type="button" :disabled="noData" @click="onSubmit" :is-loading="isLoading">
              Update
            </MyButton>

          </div>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/views/components/shadcn/ui/dialog';
import { SquarePen } from 'lucide-vue-next';

import { type User } from '@/services/user/User';
import { computed, ref, watch } from 'vue';
import { type Action } from "@/composables/userModalProvider"

import { useToast } from '@/views/components/shadcn/ui/toast/use-toast'
import type { FlattenedEditUserErrors } from '@/types/user'
import { z } from 'zod'

const { toast } = useToast();
const props = defineProps<{
  user: User | undefined,
  action?: Action
}>()
const userData = computed(() => props.user?.data)


const reset = {
  first_name: '',
  last_name: '',
  email: '',
}

const isShown = ref(false)
watch([() => props.user, () => props.action], ([nUser, nAction]) => {
  formData.value = { ...reset }
  formError.value = { ...reset }
  errorText.value = ""

  if (nUser && nAction == 'edit') isShown.value = true;
  else isShown.value = false
})

type FormType = {
  first_name: string,
  last_name: string,
  email: string,
}

const formData = ref<FormType>({ ...reset })
const formError = ref<FormType>({ ...reset })
  const noData = computed(() => !formData.value?.first_name &&
  !formData.value?.last_name &&
  !formData.value?.email
)

const isLoading = ref(false)
const errorText = ref('')
async function onSubmit() {
  try {
    isLoading.value = true
    formError.value = { ...reset }
    errorText.value = ""
    const old = {
      ...userData.value
    }

    await props.user?.edit(formData.value)
    toast({
      title: 'User updated!',
      description: `${old?.first_name} ${old?.last_name} was updated.`,
    });

    isShown.value = false
    isLoading.value = false
  } catch (error: any) {
    isLoading.value = false
    if (error instanceof z.ZodError) {
      const formatted: FlattenedEditUserErrors = error.flatten()
      formError.value.first_name = formatted.fieldErrors.first_name?.[0] || ''
      formError.value.last_name = formatted.fieldErrors.last_name?.[0] || ''
      formError.value.email = formatted.fieldErrors.email?.[0] || ''
    } else {
      errorText.value = error.message
    }
  }
}
</script>

<style scoped></style>