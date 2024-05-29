<script setup lang="ts">
import type { BollingerBandsParams } from "./BollingerBands";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  <div class="flex flex-col gap-4">
    <h6 class="font-bold mb-2">Bollinger Bands</h6>

    <div class="flex gap-2">
      <Input label="Period" :model-value="period" disabled />

      <Input label="Standard deviation" :model-value="stdDev" disabled />
    </div>

    <Input label="Line width" v-model="lineParams.lineWidth" />

    <div class="flex items-center gap-2">
      <Switch v-model:checked="showColors" label="Show colors" />
      <Label>Show colors</Label>
      <input v-if="showColors" type="color" v-model="lineParams.color" />
    </div>
  </div>
</template>
