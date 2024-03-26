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
        <MyInput v-model="email" label="Email" />
        <MyButton type="submit" :is-loading="isLoading">
          Login
        </MyButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useStore} from '@/stores/auth'
import { useRouter } from 'vue-router';

const email = ref('')
const isLoading = ref(false)
const authStore = useStore();
const router = useRouter()

async function onSubmit() {
  isLoading.value = true
  await authStore.login({
    email: email.value
  })

  router.push({name:'user'})

  isLoading.value = false
}

</script>

<style scoped></style>