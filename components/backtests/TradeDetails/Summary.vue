<script setup lang="ts">
import type { AnaliticTrade } from "@/server/types";
import DateColumn from "@/components/UI/DateColumn.vue";
import PercentColumn from "@/components/UI/PercentColumn.vue";

defineProps<AnaliticTrade>();
</script>

<template>
  <v-row class="mb-4">
    <v-col cols="3">
      <b>Open time:</b><br />
      <date-column :date="openTime" />
    </v-col>

    <v-col cols="3">
      <b>Close time:</b><br />
      <date-column :date="closeTime" />
    </v-col>

    <v-col cols="3">
      <b>PnL:</b><br />
      <PercentColumn :number="pnl" />
    </v-col>

    <v-col cols="3">
      <b>PnL in points:</b><br />
      {{ (Number(closePrice) - openPrice) * direction }}
    </v-col>

    <v-col cols="3">
      <b>SL:</b><br />
      {{ sl }}
    </v-col>

    <v-col cols="3">
      <b>TP:</b><br />
      {{ tp }}
    </v-col>
  </v-row>
</template>
