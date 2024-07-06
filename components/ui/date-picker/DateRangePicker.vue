<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";

import { CalendarIcon } from "@radix-icons/vue";
import type { DateRange } from "radix-vue";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const model = defineModel<DateRange>({
  required: true,
});
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="w-[280px] justify-center text-left font-normal"
        :class="!model && 'text-muted-foreground'"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="model.start">
          <template v-if="model.end">
            {{ df.format(model.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(model.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(model.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else> Pick a date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="model"
        initial-focus
        :number-of-months="2"
        @update:start-value="(startDate) => (model.start = startDate)"
      />
    </PopoverContent>
  </Popover>
</template>
