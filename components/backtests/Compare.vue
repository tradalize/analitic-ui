<script setup lang="ts">
import { NuxtLink } from "#components";
import PercentColumn from "@/components/UI/PercentColumn.vue";
import { ReloadIcon } from "@radix-icons/vue";
import { refDebounced } from "@vueuse/core";
import type { ColumnDef } from "@tanstack/vue-table";
import type { TradesSummary } from "@tradalize/core";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-icons/vue";

const strategyNameInput = ref();
const symbolInput = ref();
const timeframeInput = ref();
const strategyName = refDebounced<string>(strategyNameInput, 500);
const symbol = refDebounced<string>(symbolInput, 500);
const timeframe = refDebounced<string>(timeframeInput, 500);

const {
  data: tableItems,
  refresh,
  status,
} = useFetch("/api/backtests/analitic/compare", {
  query: {
    strategyName,
    symbol,
    timeframe,
  },
  immediate: false,
  default: () => [],
});

const columns: ColumnDef<TradesSummary>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "strategyParams",
    header: "Strategy params",
    cell: ({ getValue }) => {
      const value = getValue<{ symbol: string; timeframe: string }>();
      return `${value.symbol} ${value.timeframe}`;
    },
  },
  {
    accessorKey: "maxGain",
    header: "Max gain",
    cell: ({ getValue }) => h(PercentColumn, { number: getValue<number>() }),
    enableSorting: true,
  },
  {
    accessorKey: "maxLoss",
    header: "Max loss",
    cell: ({ getValue }) => h(PercentColumn, { number: getValue<number>() }),
    enableSorting: true,
  },
  {
    accessorKey: "averageWin",
    header: "Average win",
    cell: ({ getValue }) => h(PercentColumn, { number: getValue<number>() }),
    enableSorting: true,
  },
  {
    accessorKey: "averageLoss",
    header: "Average loss",
    cell: ({ getValue }) => h(PercentColumn, { number: getValue<number>() }),
    enableSorting: true,
  },
  {
    accessorKey: "winrate",
    header: "Winrate",
    cell: ({ getValue }) => h(PercentColumn, { number: getValue<number>() }),
    enableSorting: true,
  },
  {
    accessorKey: "profitFactor",
    header: "Profit factor",
    enableSorting: true,
  },
  {
    accessorKey: "profitResult",
    header: "Cum, %",
    cell: ({ getValue }) => h(PercentColumn, { number: getValue<number>() }),
    enableSorting: true,
  },
  {
    accessorKey: "cumulativePnl",
    header: "Cum, $",
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
    enableSorting: true,
  },
  {
    accessorKey: "tradesCount",
    header: "Trades count",
    enableSorting: true,
  },
  {
    accessorKey: "winsCount",
    header: "Wins count",
    enableSorting: true,
  },
  {
    accessorKey: "longsCount",
    header: "Longs count",
    enableSorting: true,
  },
  {
    accessorKey: "shortsCount",
    header: "Shorts count",
    enableSorting: true,
  },
  {
    accessorKey: "averageTimeInTradeLabel",
    header: "Average time in trade",
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) =>
      h(
        NuxtLink,
        {
          to: {
            name: "Backtest",
            params: { id: row.getValue<number>("id") },
          },
        },
        h(MagnifyingGlassIcon)
      ),
  },
];
</script>

<template>
  <Card>
    <CardHeader class="flex-row gap-4 items-center">
      <Input
        class="flex-grow"
        id="strategy-name"
        v-model="strategyNameInput"
        label="Strategy"
      />
      <Input
        class="flex-grow"
        id="symbol"
        v-model="symbolInput"
        label="Symbol"
      />
      <Input
        class="flex-grow"
        id="timeframe"
        v-model="timeframeInput"
        label="Timeframe"
      />
      <Button
        @click="refresh"
        variant="secondary"
        size="sm"
        class="relative top-3"
      >
        <ReloadIcon />
      </Button>
    </CardHeader>

    <CardContent>
      <DataTable
        :columns="columns"
        :data="tableItems"
        :loading="status === 'pending'"
      />
    </CardContent>
  </Card>
</template>
