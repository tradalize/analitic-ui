<script setup lang="ts">
import {
  ColorType,
  createChart,
  LineStyle,
  type IChartApi,
  type LineData,
  CrosshairMode,
  type LogicalRange,
  type ISeriesApi,
  type Time,
  type ChartOptions,
  type DeepPartial,
} from "lightweight-charts";
import { std as standardDeviation } from "mathjs";

const props = defineProps<{
  asset1Title: string;
  asset1: LineData[];
  asset2Title: string;
  asset2: LineData[];
  spreads: LineData[];
}>();

const defaultChartOptions: DeepPartial<ChartOptions> = {
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
    mode: CrosshairMode.Magnet,
  },
  timeScale: {
    timeVisible: true,
  },
};

const correlationChartContainer = ref();
const zScoreChartContainer = ref();

const zScoreData = computed<LineData[]>(() => {
  const std = standardDeviation(props.spreads.map(({ value }) => value));

  return props.spreads.map(({ time, value }) => ({
    time,
    value: Math.abs(value / (std as unknown as number)),
  }));
});

let priceActionsChart: IChartApi;
let zScoreChart: IChartApi;

function getCrosshairDataPoint(series: ISeriesApi<"Line", Time>, param: any) {
  if (!param.time) {
    return null;
  }
  const dataPoint = param.seriesData.get(series);
  return dataPoint || null;
}

function syncCrosshair(
  chart: IChartApi,
  series: ISeriesApi<"Line", Time>,
  dataPoint: any
) {
  if (dataPoint) {
    chart.setCrosshairPosition(dataPoint.value, dataPoint.time, series);
    return;
  }
  chart.clearCrosshairPosition();
}

onMounted(async () => {
  priceActionsChart = createChart(
    correlationChartContainer.value,
    defaultChartOptions
  );
  zScoreChart = createChart(zScoreChartContainer.value, defaultChartOptions);

  const asset1Series = priceActionsChart.addLineSeries({
    title: props.asset1Title,
    color: "#006702",
  });
  const asset2Series = priceActionsChart.addLineSeries({
    title: props.asset2Title,
    color: "#dd4f00",
  });

  asset1Series.setData(props.asset1);
  asset2Series.setData(props.asset2);

  const zScoreSeries = zScoreChart.addLineSeries({
    title: "Z-Score",
    lineWidth: 1,
  });

  zScoreSeries.setData(zScoreData.value);

  // Syncing 2 charts
  priceActionsChart
    .timeScale()
    .subscribeVisibleLogicalRangeChange((timeRange) => {
      zScoreChart.timeScale().setVisibleLogicalRange(timeRange as LogicalRange);
    });

  zScoreChart.timeScale().subscribeVisibleLogicalRangeChange((timeRange) => {
    priceActionsChart
      .timeScale()
      .setVisibleLogicalRange(timeRange as LogicalRange);
  });
  priceActionsChart.subscribeCrosshairMove((param) => {
    const dataPoint = getCrosshairDataPoint(asset1Series, param);
    syncCrosshair(zScoreChart, zScoreSeries, dataPoint);
  });
  zScoreChart.subscribeCrosshairMove((param) => {
    const dataPoint = getCrosshairDataPoint(zScoreSeries, param);
    syncCrosshair(priceActionsChart, asset1Series, dataPoint);
  });
});
</script>

<template>
  <div id="correlationChartContainer" ref="correlationChartContainer"></div>
  <div id="zScoreChartContainer" ref="zScoreChartContainer"></div>
</template>

<style scoped>
#correlationChartContainer {
  min-height: 600px;
}
#zScoreChartContainer {
  min-height: 400px;
}
</style>
