<script setup lang="ts">
import BacktestDetails from "@/components/backtests/BacktestDetails.vue";

const route = useRoute();

useHead({
  title: `Details for backtest #${route.params.id}`,
});
</script>

<template>
  <BacktestDetails :backtestId="(route.params.id as string)" />
</template>
