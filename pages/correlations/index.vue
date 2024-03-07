<script setup lang="ts">
import CorrelationMatrix from "@/components/correlations/CorrelationMatrix.vue";
import corr from "../../corr.json";

definePageMeta({
  name: "Correlations",
});

useHead({
  title: "Correlations",
});
</script>

<template><CorrelationMatrix :matrix="corr as any" /></template>
