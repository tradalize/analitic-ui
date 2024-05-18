<script setup lang="ts">
import type { TradesSummary } from "@tradalize/core";
import PercentColumn from "@/components/UI/PercentColumn.vue";
import SummaryItem from "@/components/UI/SummaryItem.vue";

defineProps<TradesSummary>();

function roundToTwoSignificantDigits(value: number): number {
  if (value === 0) return 0;

  const absValue = Math.abs(value);
  const digitCount = Math.floor(Math.log10(absValue)) + 1;
  const factor = Math.pow(10, 2 - digitCount);

  return Math.round(value * factor) / factor;
}
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

    <SummaryItem title="Expectancy:">
      <v-tooltip text="Expected profit result per trade">
        <template v-slot:activator="{ props }">
          <span v-bind="props">
            {{ roundToTwoSignificantDigits(expectancy) }}%
          </span>
        </template>
      </v-tooltip>
    </SummaryItem>

    <SummaryItem title="Average time in trade:">
      {{ averageTimeInTradeLabel }}
    </SummaryItem>

    <SummaryItem title="Cumulative PnL:">
      ${{ cumulativePnl.toFixed(2) }}
      <v-tooltip text="Simulated starting balance $1000">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" color="grey-lighten-1">
            mdi-information-symbol
          </v-icon>
        </template>
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
  </v-row>
</template>
