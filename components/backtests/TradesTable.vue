<script setup lang="ts">
import DateColumn from "@/components/UI/DateColumn.vue";
import DirectionColumn from "@/components/UI/DirectionColumn.vue";
import PercentColumn from "@/components/UI/PercentColumn.vue";
import type { AnaliticTrade } from "@/server/types";
import { TradeDetailsModalKey } from "./TradeDetails/interface";

defineProps<{
  trades: AnaliticTrade[];
}>();

const modalApi = inject(TradeDetailsModalKey);

const headers = [
  {
    key: "openTime",
    title: "Open time",
  },
  {
    key: "closeTime",
    title: "Close time",
  },
  {
    key: "direction",
    title: "Direction",
  },
  {
    key: "openPrice",
    title: "Open price",
  },
  {
    key: "closePrice",
    title: "Close price",
  },
  {
    key: "sl",
    title: "Stop loss",
  },
  {
    key: "tp",
    title: "Take profit",
  },
  {
    key: "pnl",
    title: "PnL",
  },
  {
    key: "actions",
  },
];
</script>

<template>
  <v-data-table :headers="headers" :items="trades" items-per-page="20">
    <template v-slot:item.openTime="{ item }">
      <DateColumn :date="item.openTime" />
    </template>

    <template v-slot:item.closeTime="{ item }">
      <DateColumn :date="item.closeTime" />
    </template>

    <template v-slot:item.direction="{ item }">
      <DirectionColumn :direction="item.direction" />
    </template>

    <template v-slot:item.pnl="{ item }">
      <PercentColumn :number="item.pnl" />
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn variant="tonal" @click="() => modalApi?.openModal(item)"
        >Open details</v-btn
      >
    </template>
  </v-data-table>
</template>
