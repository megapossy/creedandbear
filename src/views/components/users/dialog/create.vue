<template>
  <Dialog v-model:open="isShown">
    <DialogContent to="#modal-section" class="max-w-[415px] sm:max-w-[625px] bg-white">
      <DialogHeader>
        <DialogTitle class="text-2xl text-left flex items-center">
          <PlusCircle class="me-3" /> Create User
        </DialogTitle>
      </DialogHeader>
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
            <MyButton data-testid="submit-btn" type="button" @click="onSubmit" :is-loading="isLoading">
              Create
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
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/views/components/shadcn/ui/dialog';
import { PlusCircle } from 'lucide-vue-next';

import { type Action } from "@/composables/userModalProvider";
import { ref, watch } from 'vue';
import { Action as UserAction } from "@/services/user/Action";
import { z } from 'zod'
import type { FlattenedCreateUserErrors } from '@/types/user'

import { useToast } from '@/views/components/shadcn/ui/toast/use-toast'

UserAction.test('hey')
const { toast } = useToast();

const props = defineProps<{
  action?: Action
}>()

const reset = {
  first_name: '',
  last_name: '',
  email: '',
}

const isShown = ref(false)
watch(() => props.action, (nAction) => {
  formData.value = { ...reset }
  formError.value = { ...reset }
  errorText.value = ""

  if (nAction == 'create') isShown.value = true;
  else isShown.value = false
})

type FormType = {
  first_name: string,
  last_name: string,
  email: string,
}

const formData = ref<FormType>({ ...reset })
const formError = ref<FormType>({ ...reset })


const isLoading = ref(false)
const errorText = ref('')
async function onSubmit() {
  try {
    isLoading.value = true
    formError.value = { ...reset }
    errorText.value = ""
    await UserAction.createUser(formData.value)
    toast({
      title: 'User Created!',
      description: `${formData.value.first_name} ${formData.value.last_name} was added.`,
    });

    isShown.value = false
    isLoading.value = false
  } catch (error: any) {
    isLoading.value = false
    if (error instanceof z.ZodError) {
      const formatted: FlattenedCreateUserErrors = error.flatten()
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