<template>
  <div class="grid gap-6 sm:w-[350px] sm:p-0 p-8 m-auto ">
    <form @submit.prevent="onSubmit">
      <div class="grid gap-4">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Sign-in with Email
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your email below to sign-in
          </p>
        </div>
        <MyInput v-model="email" label="Email" :error="errorText" />
        <MyButton type="submit" :is-loading="isLoading">
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
    console.error(error.message)
    const err = JSON.parse(error.message)
    errorText.value = err[0]?.message ? err[0]?.message : ''
  }
}

</script>

<style scoped></style>