<template>
  <TableRow>
    <TableCell>
      <div>
        <div class="h-10 w-10 mb-2 rounded-full overflow-hidden border-2
        flex items-center justify-center
        ">
          <!-- <img v-if="false" class="h-8 w-8" :src="auth.data?.avatar" /> -->
          <CircleUser class="h-8 w-8" />
        </div>
        <span class="font-medium">
          Liam Johnson
        </span>
      </div>
      <div class="hidden text-sm text-muted-foreground md:inline">
        liam@example.com
      </div>
    </TableCell>
    <TableCell class="text-right">
      $250.00
    </TableCell>
  </TableRow>

</template>

<script setup lang="ts">
import { TableCell, TableRow } from '@/views/components/shadcn/ui/table';
import { CircleUser } from 'lucide-vue-next';

</script>

<style scoped></style>