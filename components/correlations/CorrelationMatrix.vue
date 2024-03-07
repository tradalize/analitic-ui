<script setup lang="ts">
import type { CorrelationMatrix } from "./types";

type CorrelationPair = {
  asset1: string;
  asset2: string;
  correlationScore: number;
};

const CORRELATION_TRASHOLD = 0.8;

const props = defineProps<{ matrix: CorrelationMatrix }>();

const perspectivePairs = computed<CorrelationPair[]>(() => {
  const candidates: CorrelationPair[] = [];

  const entries = Object.entries(props.matrix);

  for (const [asset1, values] of entries) {
    Object.entries(values).forEach(([asset2, correlationScore]) => {
      if (correlationScore !== 1 && correlationScore > CORRELATION_TRASHOLD) {
        const isOppositeExists = candidates.find(
          (item) => item.asset1 === asset2 && item.asset2 === asset1
        );

        if (!isOppositeExists) {
          candidates.push({ asset1, asset2, correlationScore });
        }
      }
    });
  }

  return candidates.sort((a, b) => b.correlationScore - a.correlationScore);
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="(pair, index) in perspectivePairs" :key="index" cols="2">
        <v-card density="compact" class="text-center">
          <div class="pa-4">{{ pair.asset1 }} / {{ pair.asset2 }}</div>

          <div class="pa-4 text-h6">{{ pair.correlationScore.toFixed(2) }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
