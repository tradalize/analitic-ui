<script setup lang="ts">
import { subDays } from "date-fns";
import type { LineData } from "lightweight-charts";
import CorrelationChart from "./CorrelationChart.vue";
import { useStorage } from "@vueuse/core";

type CorrData = {
  corr: {
    correlationScore: number;
    std: number;
    spread: number;
    zScore: number;
  };
  data: {
    asset1: LineData[];
    asset2: LineData[];
    spread: LineData[];
    zScore: LineData[];
  };
};

const props = defineProps<{ asset1: string; asset2: string }>();

const retentionDays = useStorage("correlation-retention", 30);
const interval = useStorage("correlation-interval", "1h");

// const startTime = computed(() =>
//   subDays(new Date(), retentionDays.value).getTime()
// );

const { data: corrData, pending } = useFetch<CorrData>(
  `/corr-chart/${props.asset1}/${props.asset2}`,
  {
    baseURL: "http://localhost:8000",
  }
);
</script>

<template>
  <v-card :loading="pending">
    <v-card-title> Correlation: {{ asset1 }} | {{ asset2 }} </v-card-title>

    <v-card-subtitle>
      <v-row>
        <v-col>
          <v-text-field label="Retenrion days" v-model="retentionDays" />
        </v-col>
        <v-col>
          <v-select label="interval" v-model="interval" :items="['1h']" />
        </v-col>
      </v-row>
    </v-card-subtitle>

    <v-card-text v-if="corrData?.data?.asset1?.length">
      <CorrelationChart
        :asset1-title="props.asset1"
        :asset1="corrData.data.asset1"
        :asset2-title="props.asset2"
        :asset2="corrData.data.asset2"
        :z-score="corrData.data.zScore"
        :spread="corrData.data.spread"
      />
    </v-card-text>
  </v-card>
</template>
