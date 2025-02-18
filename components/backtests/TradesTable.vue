<script setup lang="ts">
import DateColumn from "@/components/UI/DateColumn.vue";
import DirectionColumn from "@/components/UI/DirectionColumn.vue";
import PercentColumn from "@/components/UI/PercentColumn.vue";
import type { AnaliticTrade } from "@/server/types";
import { TradeDetailsModalKey } from "./TradeDetails/interface";
import type { ColumnDef } from "@tanstack/vue-table";
import { UTable } from "#components";

defineProps<{
  trades: AnaliticTrade[];
}>();

const modalApi = inject(TradeDetailsModalKey);

const columns: ColumnDef<AnaliticTrade>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "openTime",
    header: "Open time",
    enableSorting: true,
  },
  {
    accessorKey: "closeTime",
    header: "Close time",
  },
  {
    accessorKey: "direction",
    header: "Direction",
  },
  {
    accessorKey: "openPrice",
    header: "Open price",
  },
  {
    accessorKey: "closePrice",
    header: "Close price",
  },
  {
    accessorKey: "sl",
    header: "Stop loss",
  },
  {
    accessorKey: "tp",
    header: "Take profit",
  },
  {
    accessorKey: "pnl",
    header: "PnL",
    enableSorting: true,
  },
  {
    id: "action",
  },
];
</script>

<template>
  <UTable
    :columns="columns"
    :data="trades"
    :default-sorting="[{ id: 'openTime', desc: true }]"
  >
    <template #pnl-openTime="{ row }">
      <DateColumn :date="row.original.openTime" />
    </template>

    <template #pnl-closeTime="{ row }">
      <DateColumn :date="row.original.closeTime" />
    </template>

    <template #pnl-direction="{ row }">
      <DirectionColumn :direction="row.original.direction" />
    </template>

    <template #pnl-cell="{ row }">
      <PercentColumn :number="row.original.pnl" />
    </template>

    <template #action-cell="{ row }">
      <UButton
        label="Open details"
        size="sm"
        color="neutral"
        variant="ghost"
        @click="modalApi?.openModal(row.original)"
      />
    </template>
  </UTable>
</template>
