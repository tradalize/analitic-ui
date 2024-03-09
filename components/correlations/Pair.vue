<script setup lang="ts">
import { subDays } from "date-fns";
import type { LineData } from "lightweight-charts";
import CorrelationChart from "./CorrelationChart.vue";
import ZScoreChart from "./ZScoreChart.vue";

const props = defineProps<{ asset1: string; asset2: string }>();

const startTime = subDays(new Date(), 60).getTime();
const interval = "1h";

const { data: candlesAsset1, pending: pendingAsset1 } = useFetch(
  "/api/exchange/binance/futures/klines",
  {
    query: {
      symbol: props.asset1,
      interval,
      startTime,
    },
    default: () => [],
  }
);

const { data: candlesAsset2, pending: pendingAsset2 } = useFetch(
  "/api/exchange/binance/futures/klines",
  {
    query: {
      symbol: props.asset2,
      interval,
      startTime,
    },
    default: () => [],
  }
);

const calcRelative = (prevPrice: number, price: number): number =>
  Number(((price - prevPrice) / prevPrice).toFixed(6));

const relativeValues = computed(() => {
  let price1 = 0;
  let price2 = 0;
  const asset1SeriesData: LineData[] = [];
  const asset2SeriesData: LineData[] = [];
  const spreads: LineData[] = [];

  if (candlesAsset1.value.length > 0 && candlesAsset2.value.length > 0)
    for (let i = 1; i < candlesAsset1.value.length; i++) {
      const prevCandle1 = candlesAsset1.value[i - 1];
      const candle1 = candlesAsset1.value[i];
      price1 += calcRelative(prevCandle1.close, candle1.close);

      const prevCandle2 = candlesAsset2.value[i - 1];
      const candle2 = candlesAsset2.value[i];
      price2 += calcRelative(prevCandle2.close, candle2.close);

      asset1SeriesData.push({
        time: candle1.time,
        value: price1,
      });

      asset2SeriesData.push({
        time: candle2.time,
        value: price2,
      });

      spreads.push({ time: candle1.time, value: price1 - price2 });
    }

  return {
    asset1SeriesData,
    asset2SeriesData,
    spreads,
  };
});
</script>

<template>
  <v-card :loading="pendingAsset1 || pendingAsset2">
    <v-card-title> Correlation: {{ asset1 }} | {{ asset2 }} </v-card-title>

    <v-card-text v-if="relativeValues.asset1SeriesData?.length > 0">
      <CorrelationChart
        :asset1-title="props.asset1"
        :asset1="relativeValues.asset1SeriesData"
        :asset2-title="props.asset2"
        :asset2="relativeValues.asset2SeriesData"
      />
      <ZScoreChart :spreads="relativeValues.spreads" />
    </v-card-text>
  </v-card>
</template>
