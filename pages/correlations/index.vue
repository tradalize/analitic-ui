<script setup lang="ts">
import CorrelationMatrix from "@/components/correlations/CorrelationMatrix.vue";
// import corr from "../../corr.json";

definePageMeta({
  name: "Correlations",
});

useHead({
  title: "Correlations",
});

type CorrItem = {
  symbol1: string
}

// const { data } = useFetch("/api/arbitrage/correlation-matrix", {
//   cache: "force-cache",
//   key: "correlation-matrix",
//   getCachedData(key, nuxtApp) {
//     return nuxtApp.payload.data[key];
//   },
// });
</script>

<template>
  <!-- <pre><code>{{ data }}</code></pre> -->
  <!-- <CorrelationMatrix :matrix="corr as any" />   -->
</template>
