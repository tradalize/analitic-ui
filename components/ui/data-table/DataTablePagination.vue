<script setup lang="ts" generic="TData">
import { type Table } from "@tanstack/vue-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-icons/vue";

import { Button } from "@/components/ui/button";

type DataTablePaginationProps = {
  table: Table<TData>;
};

const props = defineProps<DataTablePaginationProps>();

const paginationWindow = 5;
const halfWindow = parseInt(String(paginationWindow / 2));

const pageCount = computed(() => props.table.getPageCount());
const curPage = computed(() => props.table.getState().pagination.pageIndex + 1);

const pageButtons = computed(() => {
  const pagination = [];

  if (pageCount.value <= paginationWindow) {
    for (let i = 1; i <= pageCount.value; i++) {
      pagination.push(i);
    }
  } else {
    if (curPage.value <= paginationWindow - halfWindow) {
      for (let i = 1; i <= 5; i++) {
        pagination.push(i);
      }
    } else if (curPage.value >= pageCount.value - halfWindow) {
      for (
        let i = pageCount.value - halfWindow * 2;
        i <= pageCount.value;
        i++
      ) {
        pagination.push(i);
      }
    } else {
      for (
        let i = curPage.value - halfWindow;
        i <= curPage.value + halfWindow;
        i++
      ) {
        pagination.push(i);
      }
    }
  }

  return pagination;
});
</script>

<template>
  <div class="flex justify-center items-center space-x-2 py-4">
    <Button
      variant="outline"
      size="sm"
      :disabled="!table.getCanPreviousPage()"
      @click="table.setPageIndex(0)"
    >
      <DoubleArrowLeftIcon class="w-4 h-4 mr-2" />
      1
    </Button>
    <Button
      variant="outline"
      class="w-8 h-8 p-0"
      :disabled="!table.getCanPreviousPage()"
      @click="table.previousPage()"
    >
      <ChevronLeftIcon class="w-4 h-4" />
    </Button>
    <Button
      v-for="page in pageButtons"
      variant="outline"
      size="sm"
      :disabled="page === curPage"
      @click="table.setPageIndex(page - 1)"
      >{{ page }}</Button
    >
    <Button
      variant="outline"
      class="w-8 h-8 p-0"
      :disabled="!table.getCanNextPage()"
      @click="table.nextPage()"
    >
      <ChevronRightIcon class="w-4 h-4" />
    </Button>
    <Button
      variant="outline"
      size="sm"
      :disabled="!table.getCanNextPage()"
      @click="table.setPageIndex(pageCount - 1)"
    >
      {{ pageCount }}
      <DoubleArrowRightIcon class="w-4 h-4 ml-2" />
    </Button>
  </div>
</template>
