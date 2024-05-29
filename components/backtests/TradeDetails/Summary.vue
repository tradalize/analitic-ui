<script setup lang="ts">
import type { AnaliticTrade } from "@/server/types";
import DateColumn from "@/components/UI/DateColumn.vue";
import PercentColumn from "@/components/UI/PercentColumn.vue";
import SummaryItem from "@/components/UI/SummaryItem.vue";

defineProps<AnaliticTrade>();
</script>

<template>
  <div
    class="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-4 xl:grid-cols-8 md:grid-cols-6 mb-4"
  >
    <SummaryItem title="Open time:">
      <date-column :date="openTime" />
    </SummaryItem>

    <SummaryItem title="Close time:">
      <date-column :date="closeTime" />
    </SummaryItem>

    <SummaryItem title="Open price:">
      {{ openPrice }}
    </SummaryItem>

    <SummaryItem title="Close price:">
      {{ closePrice }}
    </SummaryItem>

    <SummaryItem title="PnL:">
      <PercentColumn :number="pnl" />
    </SummaryItem>

    <SummaryItem title="PnL in points:">
      {{ (Number(closePrice) - openPrice) * direction }}
    </SummaryItem>

    <SummaryItem title="SL:">
      {{ sl }}
    </SummaryItem>

    <SummaryItem title="TP:">
      {{ tp }}
    </SummaryItem>
  </div>
</template>
