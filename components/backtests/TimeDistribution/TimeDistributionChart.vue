<script setup lang="ts">
import {
  ColorType,
  LineStyle,
  createChart,
  type HistogramData,
} from "lightweight-charts";

const props = defineProps<{ data: HistogramData[] }>();

const timeDistributionChart = ref();

onMounted(() => {
  try {
    const chart = createChart(timeDistributionChart.value, {
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
      timeScale: {
        timeVisible: true,
      },
    });

    const baselineSeries = chart.addHistogramSeries();

    baselineSeries.setData(props.data);

    chart.timeScale().fitContent();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div
    id="timeDistributionChart"
    ref="timeDistributionChart"
    class="my-6 min-h-96"
  />
</template>
