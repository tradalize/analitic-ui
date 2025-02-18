<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  createChart,
  ColorType,
  LineStyle,
  type UTCTimestamp,
  type MouseEventHandler,
  type Time,
} from "lightweight-charts";
import type { AnaliticTrade } from "@/server/types";
import { TradeDetailsModalKey } from "./TradeDetails/interface";

const props = defineProps<{ trades: AnaliticTrade[] }>();
const chartContainer = ref();

const modalApi = inject(TradeDetailsModalKey);

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

const chartClickHandler: MouseEventHandler<Time> = ({ seriesData }) => {
  const time = seriesData.values().next().value?.time as UTCTimestamp;

  const targetTrade = props.trades.find(
    ({ openTime }) => openTime === time * 1000
  );

  if (targetTrade) {
    modalApi?.openModal(targetTrade);
  }
};

onMounted(() => {
  const chart = createChart(chartContainer.value, {
    autoSize: true,
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

  chart.subscribeClick(chartClickHandler);
});
</script>

<template>
  <div id="chartContainer" ref="chartContainer" class="my-6" />
</template>

<style scoped>
#chartContainer {
  min-height: 500px;
}
</style>
