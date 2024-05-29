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
  <div class="grid gap-2 grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
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
      <div title="Expected profit result per trade">
        {{ roundToTwoSignificantDigits(expectancy) }}%
      </div>
    </SummaryItem>

    <SummaryItem title="Average time in trade:">
      {{ averageTimeInTradeLabel }}
    </SummaryItem>

    <SummaryItem title="Cumulative PnL:">
      <div title="Simulated starting balance $1000">
        ${{ cumulativePnl.toFixed(2) }}
      </div>
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
  </div>
</template>
