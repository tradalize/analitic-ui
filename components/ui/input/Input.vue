<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  inputClass?: HTMLAttributes["class"];
  id?: string;
  label?: string;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <Label v-if="label" :for="id">{{ label }}</Label>
    <input
      v-model="modelValue"
      :id
      :disabled
      :class="
        cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          props.inputClass
        )
      "
    />
  </div>
</template>
