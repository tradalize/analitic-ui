<script setup lang="ts">
import type { Backtest } from "@tradalize/drizzle-adapter/dist/pg";
import type { TableColumn } from "@nuxt/ui";

const { data: backtests, refresh: refreshBacktests } = await useFetch<
  Backtest[]
>("/api/backtests", { default: () => [] });

const columns: TableColumn<Backtest>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "strategyName", header: "Strategy name" },
  { accessorKey: "strategyParams.symbol", header: "Symbol" },
  { accessorKey: "strategyParams.timeframe", header: "Timeframe" },
  { id: "action" },
];

const deleteId = ref<number>();
const { execute: deleteBacktest, status: deleteStatus } = useFetch(
  () => `/api/backtests/${deleteId.value}`,
  {
    method: "delete",
    immediate: false,
    onResponse: refreshBacktests,
  }
);

const deleteHandler = (id: number) => {
  deleteId.value = id;
  deleteBacktest();
};
</script>

<template>
  <UTable :data="backtests" :columns>
    <template #action-cell="{ row }">
      <div class="flex gap-4 justify-center">
        <UButton size="sm" :to="`/backtests/${row.original.id}`">
          Open
        </UButton>

        <UButton
          color="error"
          variant="outline"
          size="sm"
          :loading="deleteStatus === 'pending'"
          @click="deleteHandler(row.original.id)"
        >
          Delete
        </UButton>
      </div>
    </template>
  </UTable>
</template>
