<template>
  <Content>
    <div class="mt-4">
      <Card>
        <CardHeader class="flex flex-row items-center">
          <div class="grid gap-2">
            <CardTitle class="text-2xl font-bold ">Logout</CardTitle>
            <CardDescription  class="text-xl mt-2">Are you sure you want to logout?</CardDescription>

          </div>
        </CardHeader>
        <CardContent>
          <MyButton btn-type="danger" @click="logout" class="px-12 my-4 mx-auto">
            Confirm
          </MyButton>
        </CardContent>
      </Card>

    </div>
  </Content>
</template>

<script setup lang="ts">
import Content from "@/views/layouts/default/content.vue"
import router from '@/router';
import { Action as AuthAction } from '@/services/auth/Action';
import { Card,CardDescription, CardContent, CardHeader, CardTitle } from '@/views/components/shadcn/ui/card';


const logout = () => {
  AuthAction.logout();
  router.push({ name: 'login' })
}
</script>

<style scoped></style>