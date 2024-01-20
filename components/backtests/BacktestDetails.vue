<script setup lang="ts">
import TradeDetails from "./TradeDetails.vue";
import EquityCurve from "./EquityCurve.vue";
import TradesTable from "./TradesTable.vue";

type Props = {
  backtestId: string;
};

const props = defineProps<Props>();

const { data: backtestAnalitic, pending } = await useFetch(
  `/api/backtests/analitic/${props.backtestId}`
);
</script>

<template>
  <v-skeleton-loader v-if="pending" type="card" />
  <v-card v-else>
    <v-card-title primary-title> ID: {{ backtestId }} </v-card-title>
    <v-container>
      <v-row v-if="backtestAnalitic?.summary">
        <v-col
          v-for="[field, val] in Object.entries(backtestAnalitic.summary)"
          cols="3"
        >
          <b>{{ field }}:</b><br />{{ val }}
        </v-col>
      </v-row>

      <TradeDetails v-if="backtestAnalitic">
        <EquityCurve :trades="backtestAnalitic.trades" />

        <TradesTable :trades="backtestAnalitic.trades" />
      </TradeDetails>
    </v-container>
  </v-card>
</template>
