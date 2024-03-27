<template>

  <Card>
    <CardHeader class="flex flex-row items-center">
      <div class="grid gap-2">
        <CardTitle>Users</CardTitle>
      </div>
    </CardHeader>
    <CardContent>

      <div class="flex items-center space-x-4 w-full">
        <Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2 w-full">
          <Skeleton class="h-4 w-[99%]" />
          <Skeleton class="h-4 w-[60%]" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Details</TableHead>

            <TableHead class="text-right">
              <!-- Actions -->
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Row />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/views/components/shadcn/ui/card';
import { Skeleton } from '@/views/components/shadcn/ui/skeleton';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/views/components/shadcn/ui/table';

import Row from "./row.vue"

</script>

<style scoped></style>