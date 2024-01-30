<script setup lang="ts">
import PercentColumn from "@/components/UI/PercentColumn.vue";
import { refDebounced } from "@vueuse/core";

const strategyNameInput = ref();
const symbolInput = ref();
const timeframeInput = ref();
const strategyName = refDebounced<string>(strategyNameInput, 500);
const symbol = refDebounced<string>(symbolInput, 500);
const timeframe = refDebounced<string>(timeframeInput, 500);

const {
  data: tableItems,
  refresh,
  status,
} = useFetch("/api/backtests/analitic/compare", {
  query: {
    strategyName,
    symbol,
    timeframe,
  },
  immediate: false,
  default: () => [],
});

const tableHeaders = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Strategy params",
    key: "strategyParams",
  },
  {
    title: "Max gain",
    key: "maxGain",
  },
  {
    title: "Max loss",
    key: "maxLoss",
  },
  {
    title: "Average win",
    key: "averageWin",
  },
  {
    title: "Average loss",
    key: "averageLoss",
  },
  {
    title: "Winrate",
    key: "winrate",
  },
  {
    title: "Profit factor",
    key: "profitFactor",
  },
  {
    title: "Cum, %",
    key: "profitResult",
  },
  {
    title: "Cum, $",
    key: "cumulativePnl",
  },
  {
    title: "Trades count",
    key: "tradesCount",
  },
  {
    title: "Wins count",
    key: "winsCount",
  },
  {
    title: "Longs count",
    key: "longsCount",
  },
  {
    title: "Shorts count",
    key: "shortsCount",
  },
  {
    title: "Average time in trade",
    key: "averageTimeInTradeLabel",
  },
  {
    key: "actions",
  },
];
</script>

<template>
  <v-card>
    <v-card-title primary-title>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              name="strategy-name"
              v-model="strategyNameInput"
              label="Strategy"
              density="compact"
            />
          </v-col>
          <v-col>
            <v-text-field
              name="symbol"
              v-model="symbolInput"
              label="Symbol"
              density="compact"
            />
          </v-col>
          <v-col>
            <v-text-field
              name="timeframe"
              v-model="timeframeInput"
              label="Timeframe"
              density="compact"
            />
          </v-col>
          <v-col cols="1" class="d-flex justify-center align-center">
            <v-btn @click="refresh" icon="mdi-refresh" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="tableHeaders"
        :items="tableItems"
        items-per-page="25"
        density="compact"
        :loading="status === 'pending'"
        multi-sort
        hover
      >
        <template v-slot:item.strategyParams="{ item }">
          <v-tooltip>
            <template #activator="{ props }">
              <span :style="{ whiteSpace: 'nowrap' }" v-bind="props">
                {{ item.strategyParams?.symbol }} |
                {{ item.strategyParams?.timeframe }}
              </span>
            </template>
            <pre>{{ JSON.stringify(item.strategyParams, null, 2) }}</pre>
          </v-tooltip>
        </template>

        <template v-slot:item.maxGain="{ item }">
          <PercentColumn :number="item.maxGain" />
        </template>

        <template v-slot:item.maxLoss="{ item }">
          <PercentColumn :number="item.maxLoss" />
        </template>

        <template v-slot:item.averageWin="{ item }">
          <PercentColumn :number="item.averageWin" />
        </template>

        <template v-slot:item.averageLoss="{ item }">
          <PercentColumn :number="item.averageLoss" />
        </template>

        <template v-slot:item.winrate="{ item }">
          <PercentColumn :number="item.winrate" />
        </template>

        <template v-slot:item.profitResult="{ item }">
          <PercentColumn :number="item.profitResult" />
        </template>

        <template v-slot:item.cumulativePnl="{ item }">
          ${{ item.cumulativePnl.toFixed(2) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex" style="gap: 0.5rem">
            <v-btn
              density="compact"
              icon="mdi-magnify-expand"
              :to="{ name: 'Backtest', params: { id: item.id } }"
            />

            <!-- <v-btn
            variant="tonal"
            density="compact"
            icon="mdi-delete"
            color="error"
            @click="deleteHandler(item.id)"
          ></v-btn> -->
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
