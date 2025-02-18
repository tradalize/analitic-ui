<script setup lang="ts">
import BacktestsTable from "@/components/backtests/BacktestsTable.vue";

definePageMeta({
  name: "Backtests",
});

useHead({
  title: "Backtests",
});
</script>

<template>
  <UContainer as="main" >
    <BacktestsTable />
  </UContainer>
</template>
