<script setup lang="ts">
import type { BollingerBandsParams } from "./BollingerBands";

defineProps<BollingerBandsParams>();

const showColors = ref(false);

const lineParams = defineModel("lineParams", {
  default: () => ({
    lineWidth: "",
    color: "",
  }),
});
</script>

<template>
  <h6 class="text-h6 mb-2">Bollinger Bands</h6>

  <v-row>
    <v-col cols="6">
      <v-text-field
        label="Period"
        class="bb-period"
        density="compact"
        :model-value="period"
        disabled
      />
    </v-col>

    <v-col cols="6">
      <v-text-field
        label="Standard deviation"
        class="bb-std"
        density="compact"
        :model-value="stdDev"
        disabled
      />
    </v-col>
  </v-row>

  <v-text-field
    label="Line width"
    density="compact"
    v-model="lineParams.lineWidth"
  />

  <v-switch v-model="showColors" label="Show colors" hide-details />

  <v-color-picker
    v-if="showColors"
    hide-sliders
    hide-canvas
    hide-inputs
    show-swatches
    mode="hex"
    elevation="0"
    swatches-max-height="140"
    v-model="lineParams.color"
  />
</template>
