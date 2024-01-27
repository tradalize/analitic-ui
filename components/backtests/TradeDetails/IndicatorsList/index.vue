<script setup lang="ts">
import { SupportedIndicators } from "@/components/charts/indicators";
import type { SupportedIndicators as TSupportedIndicators } from "@/components/charts/indicators/types";
import { IndicatorsListKey } from "../types";

const avaliableIndicators = [
  { title: "EMA", value: SupportedIndicators.ema },
  { title: "Bollinger Bands", value: SupportedIndicators.bb },
];

const { indicators, addIndicator, removeIndicator } = inject(
  IndicatorsListKey,
  {
    indicators: [],
    addIndicator: () => {},
    removeIndicator: () => {},
  }
);
</script>

<template>
  <v-row class="mb-4 indicators-row">
    <v-tooltip text="Add indicator">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-plus"
          size="small"
          variant="plain"
          id="indicators-menu-opener"
        />
      </template>
    </v-tooltip>

    <v-menu activator="#indicators-menu-opener">
      <v-list
        density="compact"
        @click:select="({ id }) => addIndicator(id as TSupportedIndicators)"
      >
        <v-list-item
          v-for="(item, index) in avaliableIndicators"
          :key="index"
          v-bind="item"
        />
      </v-list>
    </v-menu>

    <v-col v-for="(indicator, index) in indicators" cols="6">
      {{ indicator }}
      <v-btn @click="removeIndicator(index)">Remove</v-btn>
    </v-col>
  </v-row>
</template>

<style>
.indicators-row {
  position: relative;
}

#indicators-menu-opener {
  position: absolute;
  right: -1.5rem;
  top: -1.5rem;
}
</style>
