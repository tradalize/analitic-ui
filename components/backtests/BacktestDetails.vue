<script setup lang="ts">
import TradeDetails from "./TradeDetails/index.vue";
import EquityCurve from "./EquityCurve.vue";
import TradesTable from "./TradesTable.vue";
import DetailsData from "./DetailsData.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DefaultStrategyParams } from "@tradalize/drizzle-adapter/dist/pg";
import type { AnaliticBacktest } from "@/server/api/backtests/analitic/[id].get";

type Props = {
  backtestId: string;
};

const props = defineProps<Props>();

const { data: backtestAnalitic } = await useFetch<AnaliticBacktest>(
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
  <Card>
    <CardHeader>
      <CardTitle>
        {{ backtestAnalitic?.strategyName }} ID: {{ backtestId }} {{ title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <DetailsData
        v-if="backtestAnalitic?.summary"
        v-bind="backtestAnalitic.summary"
      />

      <TradeDetails
        v-if="backtestAnalitic"
        :strategy-params="(backtestAnalitic.strategyParams as DefaultStrategyParams)"
      >
        <EquityCurve :trades="backtestAnalitic.trades" />

        <TradesTable :trades="backtestAnalitic.trades" />
      </TradeDetails>
    </CardContent>
  </Card>
</template>
