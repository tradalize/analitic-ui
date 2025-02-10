<script setup lang="ts">
import CorrelationChart from "./CorrelationChart.vue";
import { CalendarDate } from "@internationalized/date";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { DateRange } from "radix-vue";
import { DateRangePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  ReloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-icons/vue";
import type { Timeframe } from "@tradalize/core";
import { subDays } from "date-fns";

const props = defineProps<{ asset1: string; asset2: string }>();

const limit = ref<number>(90);

const today = new Date("01 31 2025");
const past = subDays(today, limit.value);

const timeframe = ref<Timeframe>("1d");
const range = ref<DateRange>({
  start: new CalendarDate(past.getFullYear(), past.getMonth(), past.getDate()),
  end: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()),
});

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

const handleBack = () => {
  range.value = {
    start: range.value.start?.subtract({ days: 1 }),
    end: range.value.end?.subtract({ days: 1 }),
  };
};

const handleNext = () => {
  range.value = {
    start: range.value.start?.add({ days: 1 }),
    end: range.value.end?.add({ days: 1 }),
  };
};
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
                <SelectItem value="1d"> 1d </SelectItem>
                <SelectItem value="1h"> 1h </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center gap-2">
          <Label>Limit (number of candles)</Label>
          <Input v-model="limit" />
        </div>

        <div class="flex items-center gap-2">
          <Label>Date range</Label>
          <DateRangePicker v-model="range" />
        </div>

        <div class="flex items-center gap-1">
          <Button variant="outline" size="icon" @click="handleBack">
            <ChevronLeftIcon class="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" @click="handleNext">
            <ChevronRightIcon class="w-4 h-4" />
          </Button>
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
