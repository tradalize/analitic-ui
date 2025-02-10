<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import type { CorrelationItem } from "./types.js";
import { DataTable } from "@/components/ui/data-table";
import OpenCorrelationButton from "./OpenCorrelationButton.vue";

defineProps<{ data: CorrelationItem[] }>();

const columns: ColumnDef<CorrelationItem>[] = [
  { accessorKey: "symbol1", header: "Symbol 1" },
  { accessorKey: "symbol2", header: "Symbol 2" },
  {
    accessorKey: "score",
    header: "Correlation score",
    enableSorting: true,
    cell: ({ cell }) => cell.getValue<number>()?.toFixed(2),
  },
  {
    accessorKey: "actions",
    header: "",
    maxSize: 150,
    cell: ({ row }) =>
      h(
        "div",
        { class: "flex justify-center" },
        h(OpenCorrelationButton, {
          pair: [row.original.symbol1, row.original.symbol2],
        })
      ),
  },
];
</script>

<template>
  <DataTable
    :columns
    :data
    :pagination="{ pageSize: 20 }"
    :default-sorting="[{ id: 'score', desc: true }]"
  />
</template>
