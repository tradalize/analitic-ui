<script setup lang="ts">
import type { TradesSummary } from "@tradalize/core";
import PercentColumn from "@/components/UI/PercentColumn.vue";

defineProps<TradesSummary>();
</script>

<template>
  <v-row>
    <v-col cols="3">
      <b>Average win</b><br />
      <PercentColumn :number="averageWin" />
    </v-col>

    <v-col cols="3">
      <b>Average loss</b><br />
      <PercentColumn :number="averageLoss" />
    </v-col>

    <v-col cols="3">
      <b>Max gain</b><br />
      <PercentColumn :number="maxGain" />
    </v-col>

    <v-col cols="3">
      <b>Max loss</b><br />
      <PercentColumn :number="maxLoss" />
    </v-col>

    <v-col cols="3">
      <b>Winrate</b><br />
      <PercentColumn :number="winrate" />
    </v-col>

    <v-col cols="3">
      <b>Profit factor</b><br />
      {{ profitFactor }}
    </v-col>

    <v-col cols="3">
      <b>Cumulative PnL</b><br />
      ${{ cumulativePnl.toFixed(2) }}
      <v-tooltip text="Tooltip">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" color="grey-lighten-1">
            mdi-information-symbol
          </v-icon>
        </template>
        Simulated starting balance $1000
      </v-tooltip>
    </v-col>

    <v-col cols="3">
      <b>Profit result</b><br />
      <PercentColumn :number="profitResult" />
    </v-col>

    <v-col cols="3">
      <b>Trades count</b><br />
      {{ tradesCount }}
    </v-col>

    <v-col cols="3">
      <b>Wins count</b><br />
      {{ winsCount }}
    </v-col>

    <v-col cols="3">
      <b>Longs count</b><br />
      {{ longsCount }}
    </v-col>

    <v-col cols="3">
      <b>Shorts count</b><br />
      {{ shortsCount }}
    </v-col>

    <v-col cols="3">
      <b>Average time in trade</b><br />
      {{ averageTimeInTradeLabel }}
    </v-col>
  </v-row>
</template>
