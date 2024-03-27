<template>

  <Pagination v-slot="{ page }" :total="props.total" :sibling-count="2" show-edges :page="_page"
    @update:page="(e) => _page = e">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="( item, index ) in  items ">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>

</template>

<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/views/components/shadcn/ui/pagination'

import {
  Button,
} from '@/views/components/shadcn/ui/button'


const props = defineProps<{
  total: number,
  totalPages: number,
}>();


const _page = defineModel<number>('page', {
  required: true
})

</script>

<style scoped></style>