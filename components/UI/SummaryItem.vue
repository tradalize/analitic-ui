<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    cols?: number;
    sm?: number;
    md?: number;
    lg?: number;
  }>(),
  { cols: 6, md: 4, lg: 3 }
);
</script>

<template>
  <v-col :cols :sm :md :lg>
    <div class="font-weight-bold">{{ title }}</div>
    <slot />
  </v-col>
</template>
