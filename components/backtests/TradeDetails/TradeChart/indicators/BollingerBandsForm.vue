<script setup lang="ts">
import type { BollingerBandsParams } from "./BollingerBands";

defineProps<BollingerBandsParams>();

const lineParams = defineModel("lineParams", {
  default: () => ({
    lineWidth: "",
    color: "",
  }),
});
</script>

<template>
  <v-card flat density="compact" title="Bollinger Bands">
    <template #append>
      <slot name="title-extra" />
    </template>

    <v-card-text>
      <v-row>
        <v-col cols="8">
          <v-text-field
            label="Period"
            class="bb-period"
            density="compact"
            :model-value="period"
            disabled
          />

          <v-text-field
            label="Standard deviation"
            class="bb-std"
            density="compact"
            :model-value="stdDev"
            disabled
          />

          <v-text-field
            label="Line width"
            density="compact"
            v-model="lineParams.lineWidth"
          />
        </v-col>

        <v-col cols="4">
          <v-color-picker
            hide-sliders
            hide-canvas
            hide-inputs
            show-swatches
            mode="hex"
            elevation="0"
            swatches-max-height="140"
            v-model="lineParams.color"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
