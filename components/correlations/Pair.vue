<script setup lang="ts">
import CorrelationChart from "./CorrelationChart.vue";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import type { DateRange } from "radix-vue";
import type { Timeframe } from "@tradalize/core";
import { subDays } from "date-fns";

const props = defineProps<{ asset1: string; asset2: string }>();

const limit = ref<number>(90);

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const today = new Date();
const dateModel = shallowRef(
  new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate())
);

const past = subDays(today, limit.value);

const timeframe = ref<Timeframe>("1d");
const timeframeItems = ["1d", "1h"];

const range = ref<DateRange>({
  start: new CalendarDate(past.getFullYear(), past.getMonth(), past.getDate()),
  end: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()),
});

const start = computed(() => range.value?.start?.toDate("UTC").getTime());
const end = computed(() => range.value?.end?.toDate("UTC").getTime());

const {
  data: corrData,
  refresh,
  status,
} = useFetch("/api/arbitrage/correlation-chart", {
  method: "post",
  body: {
    symbol1: props.asset1,
    symbol2: props.asset2,
    timeframe,
    start,
    end,
  },
});

const handleBack = () => {
  dateModel.value = dateModel.value?.subtract({ days: 1 });
};

const handleNext = () => {
  dateModel.value = dateModel.value?.add({ days: 1 });
};
</script>

<template>
  <div class="flex gap-4 h-full">
    <div class="basis-3xs grow-0 flex flex-col gap-4">
      <h2 class="text-xl font-bold">{{ asset1 }}-{{ asset2 }}</h2>
      <h3 class="text-sm">
        Correlation score:
        <strong>{{
          Number(corrData?.corrScores?.correlationScore).toFixed(2)
        }}</strong>
      </h3>
      <h3 class="text-sm">
        STD: <strong>{{ Number(corrData?.corrScores?.std).toFixed(2) }}</strong>
      </h3>

      <UFormField label="Timeframe">
        <USelect :items="timeframeItems" v-model="timeframe" class="w-full" />
      </UFormField>

      <UFormField label="Limit (number of candles)">
        <UInput v-model="limit" type="number" class="w-full" />
      </UFormField>

      <UFormField label="Date">
        <UPopover>
          <UButton
            color="neutral"
            variant="subtle"
            icon="i-radix-icons-calendar"
            class="w-full justify-center"
          >
            {{
              dateModel
                ? df.format(dateModel.toDate(getLocalTimeZone()))
                : "Select a date"
            }}
          </UButton>

          <template #content>
            <UCalendar v-model="dateModel" class="p-2" />
          </template>
        </UPopover>
      </UFormField>

      <div class="flex items-center justify-center gap-1">
        <UButton
          icon="i-radix-icons-chevron-left"
          variant="outline"
          color="neutral"
          @click="handleBack"
        />

        <UButton
          icon="i-radix-icons-chevron-right"
          variant="outline"
          color="neutral"
          @click="handleNext"
        />

        <UButton
          icon="i-radix-icons-reload"
          variant="outline"
          color="neutral"
          @click="() => refresh()"
        />
      </div>
    </div>

    <div
      v-if="corrData?.data?.asset1?.length"
      class="w-full overflow-y-auto max-h-[calc(100vh-4rem)]"
    >
      <UProgress v-if="status === 'pending'" color="neutral" />

      <CorrelationChart
        :asset1-title="props.asset1"
        :asset1="corrData.data.asset1"
        :asset2-title="props.asset2"
        :asset2="corrData.data.asset2"
        :z-score="corrData.data.zScore"
        :spread="corrData.data.spread"
      />
    </div>
  </div>
</template>
