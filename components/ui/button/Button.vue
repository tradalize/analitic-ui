<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { type ButtonVariants, buttonVariants } from ".";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-icons/vue";
import type { RouteLocationRaw } from "#vue-router";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  loading?: boolean;
  disabled?: boolean;
  to?: RouteLocationRaw;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});

const navigateHandler = () => {
  if (props.to) {
    navigateTo(props.to);
  }
};
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="disabled || loading"
    @click="navigateHandler"
  >
    <ReloadIcon v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
    <slot />
  </Primitive>
</template>
