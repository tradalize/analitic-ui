<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
import type { CorrelationItem } from "./types.js";

defineProps<{ data: CorrelationItem[]; loading?: boolean }>();

const table = useTemplateRef("table");

const columns: TableColumn<CorrelationItem>[] = [
  { id: "pair", header: "Pair" },
  {
    accessorKey: "score",
    header: "Correlation score",
    enableSorting: true,
  },
  {
    id: "action",
    maxSize: 150,
  },
];

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <UTable
      ref="table"
      v-model:pagination="pagination"
      :columns
      :data
      :loading
      :default-sorting="[{ id: 'score', desc: true }]"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
    >
      <template #pair-cell="{ row }">
        {{ row.original.symbol1 }}-{{ row.original.symbol2 }}
      </template>

      <template #score-cell="{ row }">
        {{ row.original.score.toFixed(2) }}
      </template>

      <template #action-cell="{ row }">
        <UButton
          label="Open details"
          :to="{
            name: 'Correlation pair',
            params: { pair: [row.original.symbol1, row.original.symbol2] },
          }"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UTable>
    <div class="flex justify-center border-t border-(--ui-border) pt-4">
      <UPagination
        active-color="neutral"
        :default-page="
          (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
        "
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
