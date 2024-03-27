<template>
  <TableRow>
    <TableCell>
      <div class="flex">
        <div class="h-10 w-10 me-4 rounded-full overflow-hidden border-2
        flex items-center justify-center
        ">
          <img v-if="userData?.avatar" class="h-10 w-10" :src="userData.avatar" />
          <CircleUser v-else class="h-10 w-10" />
        </div>
        <div class="text-sm flex flex-col justify-center">
          <div class="font-bold">
            {{ userData?.first_name }} {{ userData?.last_name }}
          </div>
          <div class="">
            {{ userData?.email }}
          </div>
        </div>
      </div>
    </TableCell>
    <TableCell class="text-right">
      <Actions :user="props.user" />
    </TableCell>
  </TableRow>

</template>

<script setup lang="ts">
import type { User } from '@/services/user/User';
import { TableCell, TableRow } from '@/views/components/shadcn/ui/table';
import { CircleUser } from 'lucide-vue-next';
import { computed } from 'vue';

import Actions from "./actions.vue";

const props = defineProps<{
  user: User
}>()

const userData = computed(() => props.user.data)
</script>

<style scoped></style>