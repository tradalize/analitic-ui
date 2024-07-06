<script setup lang="ts">
import { CrossCircledIcon } from "@radix-icons/vue";
import CorrelationsTable from "@/components/correlations/CorrelationsTable.vue";

definePageMeta({
  name: "Correlations",
});

useHead({
  title: "Correlations",
});

type CorrItem = {
  symbol1: string;
};

const { data, status, refresh } = useFetch(
  "/api/arbitrage/correlation-matrix",
  {
    cache: "force-cache",
    key: "correlation-matrix",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key];
    },
    default: () => [],
  }
);
</script>

<template>
  <div v-if="status === 'error'" class="flex flex-col items-center py-8">
    <CrossCircledIcon class="h-12 w-12" />

    <h3 class="text-2xl font-bold my-8">
      Looks like some error accured. Make sure that arbitrage API is up and
      running
    </h3>
    <Button @click="refresh">Refresh</Button>
  </div>
  <CorrelationsTable v-else :data />
</template>
