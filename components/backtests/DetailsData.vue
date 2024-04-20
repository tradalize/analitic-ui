<script setup lang="ts">
import type { TradesSummary } from "@tradalize/core";
import PercentColumn from "@/components/UI/PercentColumn.vue";
import SummaryItem from "@/components/UI/SummaryItem.vue";

defineProps<TradesSummary>();
</script>

<template>
  <v-row>
    <SummaryItem title="Average win:">
      <PercentColumn :number="averageWin" />
    </SummaryItem>

    <SummaryItem title="Average loss:">
      <PercentColumn :number="averageLoss" />
    </SummaryItem>

    <SummaryItem title="Max gain:">
      <PercentColumn :number="maxGain" />
    </SummaryItem>

    <SummaryItem title="Max loss:">
      <PercentColumn :number="maxLoss" />
    </SummaryItem>

    <SummaryItem title="Winrate:">
      <PercentColumn :number="winrate" />
    </SummaryItem>

    <SummaryItem title="Profit factor:">
      {{ profitFactor }}
    </SummaryItem>

    <SummaryItem title="Cumulative PnL:">
      ${{ cumulativePnl.toFixed(2) }}
      <v-tooltip text="Tooltip">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" color="grey-lighten-1">
            mdi-information-symbol
          </v-icon>
        </template>
        Simulated starting balance $1000
      </v-tooltip>
    </SummaryItem>

    <SummaryItem title="Profit result:">
      <PercentColumn :number="profitResult" />
    </SummaryItem>

    <SummaryItem title="Trades count:">
      {{ tradesCount }}
    </SummaryItem>

    <SummaryItem title="Wins count:">
      {{ winsCount }}
    </SummaryItem>

    <SummaryItem title="Longs count:">
      {{ longsCount }}
    </SummaryItem>

    <SummaryItem title="Shorts count:">
      {{ shortsCount }}
    </SummaryItem>

    <SummaryItem title="Average time in trade:">
      {{ averageTimeInTradeLabel }}
    </SummaryItem>
  </v-row>
</template>
