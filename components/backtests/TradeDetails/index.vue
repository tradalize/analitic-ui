<script setup lang="ts">
import DirectionColumn from "@/components/UI/DirectionColumn.vue";
import type { DefaultStrategyParams } from "@tradalize/drizzle-adapter/dist/pg";
import type { AnaliticTrade } from "@/server/types";
import {
  TradeDetailsModalKey,
  IndicatorsListKey,
  type IndicatorsListApi,
} from "./interface";
import TradeChart from "./TradeChart/index.vue";
import Summary from "./Summary.vue";
import IndicatorsList from "./IndicatorsList.vue";
import type {
  IndicatorRecord,
  IndicatorsParams,
  SupportedIndicators,
} from "./TradeChart/indicators/types";
import { SUPPORTED_INDICATORS } from "./TradeChart/indicators";
import { useStorage } from "@vueuse/core";

const props = defineProps<{ strategyParams: DefaultStrategyParams }>();

const trade = ref<AnaliticTrade | null>(null);

const isOpen = ref(false);
const openModal = (targetTrade: AnaliticTrade) => {
  trade.value = targetTrade;
  isOpen.value = true;
};
const closeModal = () => {
  trade.value = null;
  isOpen.value = false;
};
provide(TradeDetailsModalKey, { openModal, closeModal });

const supportedIndicatorsRegexps = Object.values(SUPPORTED_INDICATORS).map(
  (r) => RegExp(r)
);
const indicatorsLinesParams = useStorage<
  IndicatorsListApi["indicatorsLinesParams"]
>(
  "indicators-lines",
  () => {
    const result: IndicatorsListApi["indicatorsLinesParams"] = {};

    for (const key of Object.keys(props.strategyParams)) {
      if (supportedIndicatorsRegexps.some((r) => r.test(key))) {
        result[key] = { title: key };
      }
    }

    return result;
  },
  undefined,
  { mergeDefaults: true }
);

const indicators = computed<IndicatorRecord[]>(() => {
  const indicators: IndicatorRecord[] = [];

  for (const [indicatorKey, indicatorParams] of Object.entries(
    props.strategyParams
  )) {
    if (supportedIndicatorsRegexps.some((r) => r.test(indicatorKey))) {
      indicators.push({
        key: indicatorKey as SupportedIndicators,
        indicatorParams: indicatorParams as IndicatorsParams,
        lineParams: indicatorsLinesParams.value[indicatorKey],
      });
    }
  }

  return indicators;
});

provide(IndicatorsListKey, {
  indicators: readonly(indicators.value),
  indicatorsLinesParams: indicatorsLinesParams,
});
</script>

<template>
  <UModal
    v-if="trade"
    v-model:open="isOpen"
    :ui="{
      content: 'w-full max-w-7xl',
      body: 'max-h-[90dvh] overflow-y-auto',
      header: 'flex items-center gap-2',
    }"
  >
    <template #header>
      Trade {{ trade.id }} {{ trade.symbol }} {{ trade.timeframe }}
      <DirectionColumn :direction="trade.direction" />
      <UButton
        icon="i-radix-icons-cross-1"
        class="ml-auto"
        size="sm"
        color="neutral"
        variant="ghost"
        @click="closeModal"
      />
    </template>

    <template #body>
      <Summary v-bind="trade" />

      <IndicatorsList />

      <TradeChart
        :trade="trade"
        :strategy-params="strategyParams"
        :indicators="indicators"
      />
    </template>
  </UModal>
  <slot />
</template>
