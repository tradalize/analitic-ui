<script setup lang="ts">
import DateColumn from "@/components/UI/DateColumn.vue";
import DirectionColumn from "@/components/UI/DirectionColumn.vue";
import PercentColumn from "@/components/UI/PercentColumn.vue";
import type { DefaultStrategyParams } from "@tradalize/drizzle-adapter/dist/pg";
import type { AnaliticTrade } from "@/server/types";
import { TradeDetailsModalKey } from "./types";
import TradeChart from "../charts/TradeChart.vue";

defineProps<{ strategyParams: DefaultStrategyParams }>();

const isOpen = ref(false);
const trade = ref<AnaliticTrade | null>(null);

const openModal = (targetTrade: AnaliticTrade) => {
  trade.value = targetTrade;
  isOpen.value = true;
};

const closeModal = () => {
  trade.value = null;
  isOpen.value = false;
};

provide(TradeDetailsModalKey, { openModal, closeModal });
</script>

<template>
  <v-dialog v-model="isOpen">
    <v-card v-if="trade">
      <v-card-title>
        Trade {{ trade.id }} {{ trade.symbol }} {{ trade.timeframe }}
        <DirectionColumn :direction="trade.direction" />
      </v-card-title>

      <v-container>
        <v-row class="mb-4">
          <v-col cols="3">
            <b>Open time:</b><br />
            <date-column :date="trade.openTime" />
          </v-col>

          <v-col cols="3">
            <b>Close time:</b><br />
            <date-column :date="trade.closeTime" />
          </v-col>

          <v-col cols="3">
            <b>PnL:</b><br />
            <PercentColumn :number="trade.pnl" />
          </v-col>

          <v-col cols="3">
            <b>PnL in points:</b><br />
            {{ (Number(trade.closePrice) - trade.openPrice) * trade.direction }}
          </v-col>

          <v-col cols="3">
            <b>SL:</b><br />
            {{ trade.sl }}
          </v-col>

          <v-col cols="3">
            <b>TP:</b><br />
            {{ trade.tp }}
          </v-col>
        </v-row>

        <TradeChart :trade="trade" :strategy-params="strategyParams" />
      </v-container>
    </v-card>
  </v-dialog>
  <slot />
</template>
