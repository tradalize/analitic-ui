<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { POSITION_DIRECTION } from "@tradalize/core";
import {
  type SeriesMarker,
  type UTCTimestamp,
  ColorType,
  createChart,
  LineStyle,
  CrosshairMode,
  type IChartApi,
} from "lightweight-charts";
import type { AnaliticTrade } from "@/server/types";
import { useBinanceFuturesChartData } from "@/composables/useBinanceFuturesChartData";
import { useFXOpenChartData } from "@/composables/useFXOpenChartData";
import { getTimeframeInterval } from "@/utils/getTimeframeInterval";
import { SUPPORTED_INDICATORS, addBollingerBands, addEma } from "./indicators";
import type { IndicatorRecord } from "./indicators/types";
import { subHours } from "date-fns";

const props = defineProps<{
  trade: AnaliticTrade;
  indicators?: IndicatorRecord[];
}>();

// const { candles, pending } = await useBinanceFuturesChartData({
//   symbol: props.trade.symbol,
//   interval: props.trade.timeframe,
//   ...getTimeframeInterval(props.trade),
// });

const { candles, pending } = await useFXOpenChartData({
  symbol: props.trade.symbol,
  timeframe: props.trade.timeframe,
  startTime: subHours(props.trade.openTime, 5).getTime(),
});

const chartContainer = ref();

const getbuyMarker = (
  time: UTCTimestamp,
  price: number,
  comment: string = ""
): SeriesMarker<UTCTimestamp> => ({
  time,
  position: "belowBar",
  color: "#2196F3",
  shape: "arrowUp",
  text: `Buy @ ${price} \n${comment}`,
});

const getSellMarker = (
  time: UTCTimestamp,
  price: number,
  comment: string = ""
): SeriesMarker<UTCTimestamp> => ({
  time,
  position: "aboveBar",
  color: "#e91e63",
  shape: "arrowDown",
  text: `Sell @ ${price} \n${comment}`,
});

let chart: IChartApi;

onMounted(async () => {
  chart = createChart(chartContainer.value, {
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

  if (props.indicators && props.indicators.length > 0) {
    for (const { key, lineParams, indicatorParams } of props.indicators) {
      switch (key) {
        case key.match(RegExp(SUPPORTED_INDICATORS.ema))?.input: {
          addEma({
            chart,
            lineParams,
            candles,
            indicatorParams: {
              period: 14,
              ...indicatorParams,
            },
          });
          break;
        }

        case "bollingerBands": {
          addBollingerBands({
            chart,
            candles,
            lineParams,
            indicatorParams: { period: 15, stdDev: 1.5, ...indicatorParams },
          });
        }

        default: {
          break;
        }
      }
    }
  }

  if (props.trade.direction === POSITION_DIRECTION.Long) {
    candlestickSeries.setMarkers([
      getbuyMarker(
        (props.trade.openTime / 1000) as UTCTimestamp,
        props.trade.openPrice,
        props.trade.comment
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
        props.trade.openPrice,
        props.trade.comment
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

onUnmounted(() => {
  const instance = getCurrentInstance();
  instance?.proxy?.$forceUpdate();

  console.log("Update");
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
