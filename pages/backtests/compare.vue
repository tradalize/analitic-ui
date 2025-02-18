<script setup lang="ts">
import Compare from "@/components/backtests/Compare.vue";

definePageMeta({
  name: "Compare backtests",
});

useHead({
  title: "Compare backtests",
});
</script>

<template>
  <UContainer as="main">
    <Compare />
  </UContainer>
</template>
