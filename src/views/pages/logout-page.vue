<template>
  <Content>
    <template #title>Logout Page</template>
    <div class="mt-4">
      <MyButton @click="logout">
        Logout
      </MyButton>
    </div>
  </Content>
</template>

<script setup lang="ts">
import Content from "@/views/layouts/default/content.vue"
import router from '@/router';
import { Action as AuthAction } from '@/services/auth/Action';


const logout = () => {
  AuthAction.logout();
  router.push({ name: 'login' })
}
</script>

<style scoped></style>