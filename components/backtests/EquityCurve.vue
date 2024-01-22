<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  createChart,
  ColorType,
  LineStyle,
  type UTCTimestamp,
} from "lightweight-charts";
import type { AnaliticTrade } from "@/server/types";

const props = defineProps<{ trades: AnaliticTrade[] }>();
const chartContainer = ref();

const pnls = computed(() => {
  let balance = 1000;

  return props.trades.map((trade) => {
    balance = balance * (1 + trade.pnl);

    return {
      time: Number(
        ((trade.openTime as number) / 1000).toFixed(0)
      ) as UTCTimestamp,
      value: balance,
    };
  });
});

onMounted(() => {
  const chart = createChart(chartContainer.value, {
    layout: {
      textColor: "white",
      background: { type: ColorType.Solid, color: "black" },
    },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        color: "rgba(255, 255, 255, 0.2)",
        style: LineStyle.Dashed,
      },
    },
  });

  chart.timeScale().fitContent();

  const baselineSeries = chart.addBaselineSeries({
    baseValue: { type: "price", price: 1000 },
    topLineColor: "rgba( 38, 166, 154, 1)",
    topFillColor1: "rgba( 38, 166, 154, 0.28)",
    topFillColor2: "rgba( 38, 166, 154, 0.05)",
    bottomLineColor: "rgba( 239, 83, 80, 1)",
    bottomFillColor1: "rgba( 239, 83, 80, 0.05)",
    bottomFillColor2: "rgba( 239, 83, 80, 0.28)",
  });

  baselineSeries.setData(pnls.value);
});
</script>

<template>
  <div id="chartContainer" ref="chartContainer" />
</template>

<style scoped>
#chartContainer {
  min-height: 500px;
  margin: 1rem 0;
}
</style>
