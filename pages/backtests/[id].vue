<script setup lang="ts">
import BacktestDetails from "@/components/backtests/BacktestDetails.vue";

const route = useRoute();

definePageMeta({
  name: "Backtest",
});

useHead({
  title: `Details for backtest #${route.params.id}`,
});
</script>

<template>
  <UContainer as="main">
    <BacktestDetails :backtestId="(route.params.id as string)" />
  </UContainer>
</template>
