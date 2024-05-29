<script setup lang="ts">
import type { EMAParams } from "./EMA";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
  <div class="flex flex-col gap-4">
    <h6 class="font-bold mb-2">EMA {{ period }}</h6>

    <Input label="Period" :model-value="period" disabled />

    <Input label="Line width" v-model="lineParams.lineWidth" />

    <div class="flex items-center gap-2">
      <Switch v-model:checked="showColors" />
      <Label>Show colors</Label>
      <input v-if="showColors" type="color" v-model="lineParams.color" />
    </div>
  </div>
</template>
