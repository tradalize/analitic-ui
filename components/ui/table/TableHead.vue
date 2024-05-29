<script setup lang="ts" generic="TData">
import type { HTMLAttributes } from "vue";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-icons/vue";
import type { Column } from "@tanstack/vue-table";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  column?: Column<TData>;
}>();

const isSortable = computed(() => props.column?.getCanSort());
const sortOrder = computed(() => props.column?.getIsSorted());

const clickHandler = (e: MouseEvent) => {
  if (isSortable.value) {
    const handler = props.column?.getToggleSortingHandler();

    console.log(handler);
    if (handler) {
      handler(e);
    }
  }
};
</script>

<template>
  <th
    :class="
      cn(
        'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5',
        isSortable ? 'cursor-pointer' : '',
        props.class
      )
    "
    @click="clickHandler"
  >
    <div class="flex items-center gap-2">
      <slot />
      <ArrowUpIcon v-if="sortOrder === 'asc'" />
      <ArrowDownIcon v-if="sortOrder === 'desc'" />
    </div>
  </th>
</template>
