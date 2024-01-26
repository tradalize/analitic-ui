<script setup lang="ts">
import TradeDetails from "./TradeDetails.vue";
import EquityCurve from "./EquityCurve.vue";
import TradesTable from "./TradesTable.vue";
import DetailsData from "./DetailsData.vue";

type Props = {
  backtestId: string;
};

const props = defineProps<Props>();

const { data: backtestAnalitic, pending } = await useFetch(
  `/api/backtests/analitic/${props.backtestId}`
);

const title = computed(() => {
  const trade = backtestAnalitic.value?.trades.at(0);

  if (!trade) {
    return "";
  }

  return `${trade.symbol} ${trade.timeframe}`;
});
</script>

<template>
  <v-skeleton-loader v-if="pending" type="card" />
  <v-card v-else>
    <v-card-title primary-title
      >{{ backtestAnalitic?.strategyName }} ID: {{ backtestId }}
      {{ title }}</v-card-title
    >
    <v-container>
      <DetailsData
        v-if="backtestAnalitic?.summary"
        v-bind="backtestAnalitic.summary"
      />

      <TradeDetails v-if="backtestAnalitic">
        <EquityCurve :trades="backtestAnalitic.trades" />

        <TradesTable :trades="backtestAnalitic.trades" />
      </TradeDetails>
    </v-container>
  </v-card>
</template>
