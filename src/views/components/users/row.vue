<template>
  <TableRow>
    <TableCell>
      <div>
        <div>
          <div class="h-10 w-10 mb-2 rounded-full overflow-hidden border-2
        flex items-center justify-center
        ">
            <img v-if="userData?.avatar" class="h-10 w-10" :src="userData.avatar" />
            <CircleUser v-else class="h-10 w-10" />
          </div>
          <span class="font-medium">
            {{ userData?.first_name }} {{ userData?.last_name }}
          </span>
        </div>
        <div class="hidden text-sm text-muted-foreground md:inline">
          {{ userData?.email }}
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