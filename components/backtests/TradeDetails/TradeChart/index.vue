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
import { useChartData } from "@/composables/useChartData";
import { SUPPORTED_INDICATORS, addBollingerBands, addEma } from "./indicators";
import type { IndicatorRecord } from "./indicators/types";
import { decimalCount } from "~/utils/calcs";

const props = defineProps<{
  trade: AnaliticTrade;
  indicators?: IndicatorRecord[];
}>();

const { candles, pending } = await useChartData({
  symbol: props.trade.symbol,
  timeframe: props.trade.timeframe,
  ...getTimeframeInterval(props.trade),
});

const chartContainer = ref();
const decimalsCount = decimalCount(props.trade.openPrice);

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
    autoSize: true,
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
    timeScale: {
      timeVisible: true,
    },
    localization: {
      priceFormatter: (price: number) => price.toFixed(decimalsCount),
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
  <div v-if="!pending" id="chartContainer" ref="chartContainer"></div>
</template>

<style scoped>
#chartContainer {
  min-height: 600px;
  margin: 0 1.5rem;
}
</style>
