<script setup lang="ts">
import Pair from "@/components/correlations/Pair.vue";
const route = useRoute();

const [asset1, asset2] = route.params.pair;

definePageMeta({
  name: "Correlation pair",
});

useHead({
  title: `Correlation ${asset1} | ${asset2}`,
});
</script>

<template>
  <div class="mx-4 h-full">
    <Pair :asset1 :asset2 />
  </div>
</template>
