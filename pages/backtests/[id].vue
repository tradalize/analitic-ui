<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <BacktestsBacktestDetails :backtestId="(route.params.id as string)" />
</template>
