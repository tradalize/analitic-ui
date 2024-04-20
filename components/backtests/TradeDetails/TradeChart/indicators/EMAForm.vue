<script setup lang="ts">
import type { EMAParams } from "./EMA";

defineProps<EMAParams>();

const showColors = ref(false);

const lineParams = defineModel("lineParams", {
  default: () => ({
    lineWidth: "",
    color: "",
  }),
});
</script>

<template>
  <h6 class="text-h6 mb-2">EMA {{ period }}</h6>

  <v-text-field
    label="Period"
    class="flex-1-1-100"
    :model-value="period"
    disabled
    density="compact"
  />

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
