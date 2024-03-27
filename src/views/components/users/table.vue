<template>
  <Card>
    <CardHeader class="flex flex-row items-center">
      <div class="grid gap-2 flex-1">
        <CardTitle class="flex justify-between">
          <div>
            Users
            <SVGLoading v-if="isLoadingFetchUser" class="h-5 w-5 inline text-slate-400 animate-spin ms-2 " />
          </div>
          <RefreshCcw v-if="isFetching || isLoadingFetchUser" class="cursor-default opacity-40" />
          <RefreshCcw v-else @click="execute()" class="cursor-pointer" />
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
        <div v-else-if="!users.hasUsers" class="flex flex-col justify-center items-center p-8">
          <PackageOpenIcon class="text-7xl mt-4" width="1em" height="1em" />
          <p class="text-xl opacity-50 mt-4">No users...</p>
        </div>
        <Table v-else>
          <TableBody>
            <Row v-for="user in users.dataAsUsers" :key="user.data?.id" :user="user" />
          </TableBody>
        </Table>
      </FadeUp>
      <ViewUserDialog :action="modalAction" :user="selectedUser" />
      <EditUserDialog :action="modalAction" :user="selectedUser" />
      <DeleteUserDialog :action="modalAction" :user="selectedUser" />

    </CardContent>
    <FadeUp>
      <CardFooter v-if="!isFetching && !isLoadingFetchUser && data">
        <Pagination v-model:page="page" :total="data.total" :totalPages="data.total_pages" />
      </CardFooter>
    </FadeUp>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/views/components/shadcn/ui/card'
import { Skeleton } from '@/views/components/shadcn/ui/skeleton'
import { Table, TableBody } from '@/views/components/shadcn/ui/table'

import EditUserDialog from "./dialog/edit.vue"
import ViewUserDialog from "./dialog/view.vue"
import DeleteUserDialog from "./dialog/delete.vue"
import Pagination from "./pagination.vue"
import Row from "./row.vue"
import SVGLoading from "@/assets/images/loading.svg"

import { Fetch as UserFetch } from '@/services/user/Fetch'
import { User } from '@/services/user/User'
import { Users } from '@/services/user/Users'
import { PackageOpenIcon, RefreshCcw } from 'lucide-vue-next'
import { onMounted, ref, provide } from 'vue'
import { provider, type Action } from "@/composables/userModalProvider"
import { useRoute } from 'vue-router'

const users = new Users();
const page = ref(1)
const { data, isFetching, execute } = UserFetch.createUseFetchUsers({ page })

const isLoadingFetchUser = ref(false);
provide('isLoadingFetchUser', isLoadingFetchUser)
const route = useRoute();
onMounted(async () => {
  if (!users.hasUsers) {
    await execute();
    if (data.value?.users)
      users.setUsersToStore(data.value.users)
  }

  // with userId params 
  if (route.params?.userId && !Array.isArray(route.params?.userId)) {
    isLoadingFetchUser.value = true
    const userRes = await UserFetch.userById(Number.parseInt(route.params.userId))
    const userFnd = new User(userRes)
    if (userFnd.data) {
      selectedUser.value = userFnd
      modalAction.value = 'view'
    }
    isLoadingFetchUser.value = false
  }
})

const selectedUser = ref<User | undefined>();
const modalAction = ref<Action | undefined>();
provider((userId, action) => {
  selectedUser.value = new User(userId)
  modalAction.value = undefined
  if (action === 'view') {
    modalAction.value = 'view'
  }
  else if (action === 'edit') {
    modalAction.value = 'edit'
  }
  else if (action === 'delete') {
    modalAction.value = 'delete'
  }
})


</script>

<style scoped></style>