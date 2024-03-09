<script setup lang="ts">
import {
  ColorType,
  createChart,
  LineStyle,
  type IChartApi,
  type LineData,
  CrosshairMode,
} from "lightweight-charts";

const props = defineProps<{
  asset1Title: string;
  asset1: LineData[];
  asset2Title: string;
  asset2: LineData[];
}>();

const correlationChartContainer = ref();

let chart: IChartApi;

onMounted(async () => {
  chart = createChart(correlationChartContainer.value, {
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

  const series1 = chart.addLineSeries({
    title: props.asset1Title,
    color: "#006702",
  });
  const series2 = chart.addLineSeries({
    title: props.asset2Title,
    color: "#dd4f00",
  });

  series1.setData(props.asset1);
  series2.setData(props.asset2);
});
</script>

<template>
  <div id="correlationChartContainer" ref="correlationChartContainer"></div>
</template>

<style scoped>
#correlationChartContainer {
  min-height: 600px;
}
</style>
