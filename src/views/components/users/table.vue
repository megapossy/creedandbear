<template>
  <Card>
    <CardHeader class="flex flex-row items-center">
      <div class="grid gap-2 flex-1">
        <CardTitle class="flex justify-between">
          <div>
            Users
            <span class="font-light text-xs ms-2" v-if="isLoadingFetchUser">
              fetching user
              <SVGLoading class="h-5 w-5 inline text-slate-400 animate-spin ms-1 " />
            </span>
          </div>
          <div class="flex">

            <PlusCircle class="me-3" :class="{
              'cursor-default opacity-40': isFetching || isLoadingFetchUser,
              'cursor-pointer': !(isFetching || isLoadingFetchUser)
            }" @click="async () => {
              if (!(isFetching || isLoadingFetchUser)) {
                modalAction = ''
                await nextTick()
                modalAction = 'create'
              }
            }" />

            <RefreshCcw class="" :class="{
              'cursor-default opacity-40': isFetching || isLoadingFetchUser,
              'cursor-pointer': !(isFetching || isLoadingFetchUser)
            }" @click="() => {
              if (!(isFetching || isLoadingFetchUser))
                execute()
            }" />

          </div>
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <FadeUp>
        <div v-if="isFetching">
          <div v-for="item in 5" :key="item" class="flex items-center space-x-4 w-full mt-4 mb-12">
            <Skeleton class="h-12 w-12 min-w-12 rounded-full" />
            <div class="space-y-2 w-full">
              <Skeleton class="h-4 w-[90%]" />
              <Skeleton class="h-4 w-[80%]" />
            </div>
            <Skeleton class="h-8 w-8 min-w-8 rounded-full hidden sm:block" />
            <Skeleton class="h-8 w-8 min-w-8 rounded-full" />
            <Skeleton class="h-8 w-8 min-w-8 rounded-full" />
          </div>
        </div>
        <div v-else-if="!Users.hasUsers" class="flex flex-col justify-center items-center p-8">
          <PackageOpenIcon class="text-7xl mt-4" width="1em" height="1em" />
          <p class="text-xl opacity-50 mt-4">No data</p>
        </div>
        <Table v-else>
          <TableBody>
            <Row v-for="user in Users.dataAsUsers" :key="user.data?.id" :user="user" />
          </TableBody>
        </Table>
      </FadeUp>
      <ViewUserDialog :action="modalAction" :user="selectedUser" />
      <EditUserDialog :action="modalAction" :user="selectedUser" />
      <DeleteUserDialog :action="modalAction" :user="selectedUser" />
      <CreateUserDialog :action="modalAction" />

    </CardContent>
    <FadeUp>
      <CardFooter v-if="!isFetching && !isLoadingFetchUser && data" class="justify-center">
        <Pagination v-model:page="page" :total="data.total" :totalPages="data.total_pages" />
      </CardFooter>
    </FadeUp>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/views/components/shadcn/ui/card'
import { Skeleton } from '@/views/components/shadcn/ui/skeleton'
import { Table, TableBody } from '@/views/components/shadcn/ui/table'

import CreateUserDialog from "./dialog/create.vue"
import EditUserDialog from "./dialog/edit.vue"
import ViewUserDialog from "./dialog/view.vue"
import DeleteUserDialog from "./dialog/delete.vue"

import Pagination from "./pagination.vue"
import Row from "./row.vue"
import SVGLoading from "@/assets/images/loading.svg"

import { Fetch as UserFetch } from '@/services/user/Fetch'
import { User } from '@/services/user/User'
import { Users } from '@/services/user/Users'
import { PackageOpenIcon, RefreshCcw, PlusCircle } from 'lucide-vue-next'
import { onMounted, ref, provide, nextTick, watch } from 'vue'
import { provider, type Action } from "@/composables/userModalProvider"
import { useRoute } from 'vue-router'
import { useToast } from '@/views/components/shadcn/ui/toast/use-toast'



const { toast } = useToast()

const page = ref(1)
const { data, isFetching, execute, error } = UserFetch.createUseFetchUsers({ page })
watch(error, (nError) => {
  if (nError) toast({
    description: `Error retrieving users data!`,
  });
})

const isLoadingFetchUser = ref(false);
provide('isLoadingFetchUser', isLoadingFetchUser)
const route = useRoute();
onMounted(async () => {
  if (!Users.hasUsers) {
    await execute();
  }

  // with userId params 
  if (route.params?.userId && !Array.isArray(route.params?.userId)) {
    isLoadingFetchUser.value = true
    try {
      const userRes = await UserFetch.userById(Number.parseInt(route.params.userId))
      const userFnd = new User(userRes)
      if (userFnd.data) {
        selectedUser.value = userFnd
        modalAction.value = 'view'
      }
    } catch (error) {
      toast({
        description: `Error retrieving user data!`,
      });
    }
    isLoadingFetchUser.value = false
  }
})

const selectedUser = ref<User | undefined>();
const modalAction = ref<Action | undefined>();
provider((userId, action) => {
  selectedUser.value = new User(userId)
  modalAction.value = action
})



</script>

<style scoped></style>