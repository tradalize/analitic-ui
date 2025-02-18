<script setup lang="ts">
import type { HistogramData, UTCTimestamp } from "lightweight-charts";
import { format } from "date-fns/format";
import type { AnaliticTrade } from "@/server/types";
import TimeDistributionChart from "./TimeDistributionChart.vue";

const props = defineProps<{ trades?: AnaliticTrade[] }>();

const gropedTrades = computed<HistogramData[]>(() => {
  if (!props.trades?.length) {
    return [];
  }

  const timeSeries = props.trades.reduce((acc, trade) => {
    const key = format(trade.openTime, "H");

    if (acc[key]) {
      acc[key] += trade.pnl;
    } else {
      acc[key] = 0;
      acc[key] += trade.pnl;
    }

    return acc;
  }, {} as Record<string, number>);

  return Object.entries(timeSeries).map(([key, value]) => ({
    value,
    time: (Number(key) * 3600) as UTCTimestamp,
    color: value < 0 ? "red" : "green",
  }));
});
</script>

<template>
  <UModal title="Time distribution" :ui="{ content: 'w-full max-w-7xl' }">
    <UButton label="Time distribution" color="neutral" variant="subtle" />

    <template #body>
      <TimeDistributionChart :data="gropedTrades" />
    </template>
  </UModal>
</template>
