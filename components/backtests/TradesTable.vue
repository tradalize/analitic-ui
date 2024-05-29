<script setup lang="ts">
import { h } from "vue";
import DateColumn from "@/components/UI/DateColumn.vue";
import DirectionColumn from "@/components/UI/DirectionColumn.vue";
import PercentColumn from "@/components/UI/PercentColumn.vue";
import type { AnaliticTrade } from "@/server/types";
import { TradeDetailsModalKey } from "./TradeDetails/interface";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-icons/vue";

defineProps<{
  trades: AnaliticTrade[];
}>();

const modalApi = inject(TradeDetailsModalKey);

const columns: ColumnDef<AnaliticTrade>[] = [
  {
    accessorKey: "openTime",
    header: "Open time",
    cell: ({ cell }) =>
      h(DateColumn, { date: cell.getValue<AnaliticTrade["openTime"]>() }),
    enableSorting: true,
    sortDescFirst: true,
  },
  {
    accessorKey: "closeTime",
    header: "Close time",
    cell: ({ cell }) =>
      h(DateColumn, { date: cell.getValue<AnaliticTrade["closeTime"]>() }),
  },
  {
    accessorKey: "direction",
    header: "Direction",
    cell: ({ cell }) =>
      h(DirectionColumn, {
        direction: cell.getValue<AnaliticTrade["direction"]>(),
      }),
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
    cell: ({ cell }) =>
      h(PercentColumn, { number: cell.getValue<AnaliticTrade["pnl"]>() }),
    enableSorting: true,
    sortDescFirst: true,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () =>
      h(
        "div",
        { class: "flex justify-center" },
        h(Button, { size: "sm" }, () => "Open details")
      ),
  },
];
</script>

<template>
  <DataTable :columns="columns" :data="trades" :pagination="{ pageSize: 10 }" />
</template>
