<script setup lang="ts">
import DirectionColumn from "@/components/UI/DirectionColumn.vue";
import type { DefaultStrategyParams } from "@tradalize/drizzle-adapter/dist/pg";
import type { AnaliticTrade } from "@/server/types";
import { TradeDetailsModalKey, IndicatorsListKey } from "./types";
import TradeChart from "@/components/charts/TradeChart.vue";
import Summary from "./Summary.vue";
import IndicatorsList from "./IndicatorsList/index.vue";
import type {
  IndicatorRecord,
  IndicatorsParams,
  SupportedIndicators,
} from "@/components/charts/indicators/types";

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

const indicators = ref<IndicatorRecord[]>([]);

const addIndicator = (key: SupportedIndicators) => {
  const indicatorParams = props.strategyParams[key] as
    | IndicatorsParams
    | undefined;

  indicators.value.push({ key, indicatorParams });
};

const removeIndicator = (index: number) => {
  indicators.value.splice(index, 1);
};

provide(IndicatorsListKey, {
  indicators: readonly(indicators.value),
  addIndicator,
  removeIndicator,
});
</script>

<template>
  <v-dialog v-model="isOpen">
    <v-card v-if="trade">
      <v-card-title>
        Trade {{ trade.id }} {{ trade.symbol }} {{ trade.timeframe }}
        <DirectionColumn :direction="trade.direction" />
      </v-card-title>

      <v-container>
        <Summary v-bind="trade" />

        <IndicatorsList />

        <TradeChart
          :trade="trade"
          :strategy-params="strategyParams"
          :indicators="indicators"
        />
      </v-container>
    </v-card>
  </v-dialog>
  <slot />
</template>
