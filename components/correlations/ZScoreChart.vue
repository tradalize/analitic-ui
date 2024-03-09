<script setup lang="ts">
import {
  ColorType,
  createChart,
  LineStyle,
  type IChartApi,
  type LineData,
  CrosshairMode,
} from "lightweight-charts";
import { std as standardDeviation } from "mathjs";

const props = defineProps<{ spreads: LineData[] }>();

const zScoreSeries = computed<LineData[]>(() => {
  const std = standardDeviation(props.spreads.map(({ value }) => value));

  return props.spreads.map(({ time, value }) => ({
    time,
    value: Math.abs(value / (std as unknown as number)),
  }));
});

const zScoreChartContainer = ref();

let chart: IChartApi;

onMounted(async () => {
  chart = createChart(zScoreChartContainer.value, {
    layout: {
      textColor: "white",
      background: { type: ColorType.Solid, color: "black" },
    },
    grid: {
      vertLines: {
        color: "rgba(255, 255, 255, 0.2)",
        style: LineStyle.Dashed,
      },
      horzLines: {
        color: "rgba(255, 255, 255, 0.2)",
        style: LineStyle.Dashed,
      },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
  });

  const series = chart.addLineSeries({
    title: "Z-Score",
  });

  series.setData(zScoreSeries.value);
});
</script>

<template>
  <div id="zScoreChartContainer" ref="zScoreChartContainer"></div>
</template>

<style scoped>
#zScoreChartContainer {
  min-height: 400px;
}
</style>
