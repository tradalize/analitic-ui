<script setup lang="ts">
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import TimeDistributionChart from "./TimeDistributionChart.vue";
import type { AnaliticTrade } from "@/server/types";
import { format } from "date-fns";
import type { HistogramData, UTCTimestamp } from "lightweight-charts";

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
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost"> Time distribution </Button>
    </DialogTrigger>

    <DialogContent class="max-w-screen-lg overflow-y-auto max-h-screen">
      <DialogHeader> Time distribution </DialogHeader>
      <TimeDistributionChart :data="gropedTrades" />
    </DialogContent>
  </Dialog>
</template>
