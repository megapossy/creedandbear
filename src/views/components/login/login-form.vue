<template>
  <div class="grid gap-6 sm:w-[350px] sm:p-0 p-8 m-auto ">
    <form data-testid="form" @submit.prevent="onSubmit">
      <div class="grid gap-4">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Sign-in
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your email below to sign-in
          </p>
        </div>
        <MyInput data-testid="input"  v-model="email" label="Email" :error="errorText" />
        <MyButton data-testid="button" type="submit" :is-loading="isLoading">
          Login
        </MyButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { Action as AuthAction } from '@/services/auth/Action';
import { ref } from 'vue';
import { z } from 'zod'

const email = ref('')
const isLoading = ref(false)
const errorText = ref('')

async function onSubmit() {
  try {
    isLoading.value = true
    errorText.value = ''
    await AuthAction.login(email.value)
    router.push({ name: 'users' })
  } catch (error: any) {
    isLoading.value = false
    if(error instanceof z.ZodError) {
      const formatted = error.flatten().formErrors;
      errorText.value = formatted[0] ? formatted[0] : ''
    } else {
      errorText.value = error.message
    }
  }
}


</script>

<style scoped></style>