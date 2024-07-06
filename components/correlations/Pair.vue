<script setup lang="ts">
import CorrelationChart from "./CorrelationChart.vue";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import type { DateRange } from "radix-vue";
import { DateRangePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-icons/vue";
import type { Timeframe } from "@tradalize/core";

const props = defineProps<{ asset1: string; asset2: string }>();

const timeframe = ref<Timeframe>("1h");
const range = ref({}) as Ref<DateRange>;

const start = computed(() => range.value?.start?.toDate("UTC").getTime());
const end = computed(() => range.value?.end?.toDate("UTC").getTime());

const { data: corrData, refresh } = useFetch(
  "/api/arbitrage/correlation-chart",
  {
    method: "post",
    body: {
      symbol1: props.asset1,
      symbol2: props.asset2,
      timeframe,
      start,
      end,
    },
  }
);
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex gap-4">
        <h1 class="text-lg font-bold mr-auto">
          {{ asset1 }} / {{ asset2 }} | score
          {{ Number(corrData?.corrScores?.correlationScore).toFixed(2) }} | std
          {{ Number(corrData?.corrScores?.std).toFixed(2) }}
        </h1>

        <div class="flex gap-2 items-center">
          <Label>Timeframe</Label>
          <Select v-model="timeframe">
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1h"> 1h </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center gap-2">
          <Label>Date range</Label>
          <DateRangePicker v-model="range" />
        </div>

        <Button variant="outline" size="icon" @click="refresh">
          <ReloadIcon class="w-4 h-4" />
        </Button>
      </div>
    </CardHeader>

    <CardContent v-if="corrData?.data?.asset1?.length">
      <CorrelationChart
        :asset1-title="props.asset1"
        :asset1="corrData.data.asset1"
        :asset2-title="props.asset2"
        :asset2="corrData.data.asset2"
        :z-score="corrData.data.zScore"
        :spread="corrData.data.spread"
      />
    </CardContent>
  </Card>
</template>
