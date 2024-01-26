<script setup lang="ts">
import { ref, onMounted } from "vue";
import { POSITION_DIRECTION } from "@tradalize/core";
import {
  type SeriesMarker,
  type UTCTimestamp,
  ColorType,
  createChart,
  LineStyle,
  CrosshairMode,
  type LineData,
} from "lightweight-charts";
import type { AnaliticTrade } from "@/server/types";
import { useBinanceFuturesChartData } from "@/composables/useBinanceFuturesChartData";
import { getTimeframeInterval } from "@/utils/getTimeframeInterval";
import { BollingerBands, EMA } from "@debut/indicators";

const props = defineProps<{
  trade: AnaliticTrade;
}>();

const bb = new BollingerBands(15, 1.5);
const slowEma = new EMA(50);
const fastEma = new EMA(30);

const { candles, pending } = await useBinanceFuturesChartData({
  symbol: props.trade.symbol,
  interval: props.trade.timeframe,
  ...getTimeframeInterval(props.trade),
});

const { upperSeries, lowerSeries, slowEmaSeries, fastEmaSeries } =
  candles.reduce(
    (acc, { time, close }) => {
      const bbValue = bb.nextValue(close);

      if (bbValue) {
        acc.upperSeries.push({ time, value: bbValue.upper });
        acc.lowerSeries.push({ time, value: bbValue.lower });
      }

      const slow = slowEma.nextValue(close);
      if (slow) {
        acc.slowEmaSeries.push({ time, value: slow });
      }

      const fast = fastEma.nextValue(close);

      if (fast) {
        acc.fastEmaSeries.push({ time, value: fast });
      }

      return acc;
    },
    {
      upperSeries: [] as LineData[],
      lowerSeries: [] as LineData[],
      slowEmaSeries: [] as LineData[],
      fastEmaSeries: [] as LineData[],
    }
  );

const chartContainer = ref();

const getbuyMarker = (
  time: UTCTimestamp,
  price: number
): SeriesMarker<UTCTimestamp> => ({
  time,
  position: "belowBar",
  color: "#2196F3",
  shape: "arrowUp",
  text: `Buy @ ${price}`,
});

const getSellMarker = (
  time: UTCTimestamp,
  price: number
): SeriesMarker<UTCTimestamp> => ({
  time,
  position: "aboveBar",
  color: "#e91e63",
  shape: "arrowDown",
  text: `Sell @ ${price}`,
});

onMounted(async () => {
  const chart = createChart(chartContainer.value, {
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

  const candlestickSeries = chart.addCandlestickSeries();
  candlestickSeries.setData(candles);

  const bbLowerSeries = chart.addLineSeries({ lineWidth: 1 });
  bbLowerSeries.setData(lowerSeries);

  const bbUpperSeries = chart.addLineSeries({ lineWidth: 1 });
  bbUpperSeries.setData(upperSeries);

  const slowEmaSeriesLine = chart.addLineSeries({
    lineWidth: 2,
    color: "#33b864",
  });
  slowEmaSeriesLine.setData(slowEmaSeries);

  const fastEmaSeriesLine = chart.addLineSeries({
    lineWidth: 1,
    color: "#F1802D",
  });
  fastEmaSeriesLine.setData(fastEmaSeries);

  if (props.trade.direction === POSITION_DIRECTION.Long) {
    candlestickSeries.setMarkers([
      getbuyMarker(
        (props.trade.openTime / 1000) as UTCTimestamp,
        props.trade.openPrice
      ),
      getSellMarker(
        (props.trade.closeTime / 1000) as UTCTimestamp,
        props.trade.closePrice
      ),
    ]);
  } else {
    candlestickSeries.setMarkers([
      getSellMarker(
        (props.trade.openTime / 1000) as UTCTimestamp,
        props.trade.openPrice
      ),
      getbuyMarker(
        (props.trade.closeTime / 1000) as UTCTimestamp,
        props.trade.closePrice
      ),
    ]);
  }

  if (props.trade.sl) {
    candlestickSeries.createPriceLine({
      price: props.trade.sl,
      color: "#ef5350",
      lineStyle: LineStyle.LargeDashed,
      title: "SL",
    });
  }

  if (props.trade.tp) {
    candlestickSeries.createPriceLine({
      price: props.trade.tp,
      color: "#00b200",
      lineStyle: LineStyle.LargeDashed,
      title: "TP",
    });
  }

  chart.timeScale().fitContent();
});
</script>

<template>
  <v-skeleton-loader v-if="pending" type="card"></v-skeleton-loader>
  <div v-else id="chartContainer" ref="chartContainer"></div>
</template>

<style scoped>
#chartContainer {
  min-height: 800px;
}
</style>
