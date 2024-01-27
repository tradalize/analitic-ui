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
} from "lightweight-charts";
import type { AnaliticTrade } from "@/server/types";
import { useBinanceFuturesChartData } from "@/composables/useBinanceFuturesChartData";
import { getTimeframeInterval } from "@/utils/getTimeframeInterval";
import type { DefaultStrategyParams } from "@tradalize/drizzle-adapter/dist/pg";
import { addBollingerBands, addEma } from "./indicators";
import type { IndicatorRecord } from "@/components/charts/indicators/types";

const props = defineProps<{
  trade: AnaliticTrade;
  strategyParams: DefaultStrategyParams;
  indicators?: IndicatorRecord[];
}>();

const { candles, pending } = await useBinanceFuturesChartData({
  symbol: props.trade.symbol,
  interval: props.trade.timeframe,
  ...getTimeframeInterval(props.trade),
});

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

  addBollingerBands({
    chart,
    candles,
    indicatorParams: { period: 15, stdDev: 1.5 },
  });

  addEma({
    chart,
    lineParams: {
      title: "Slow EMA",
      priceLineVisible: false,
      lineWidth: 2,
      color: "#33b864",
    },
    candles,
    indicatorParams: { period: 50 },
  });

  addEma({
    chart,
    lineParams: {
      title: "Fast EMA",
      priceLineVisible: false,
      lineWidth: 1,
      color: "#F1802D",
    },
    candles,
    indicatorParams: { period: 30 },
  });

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
