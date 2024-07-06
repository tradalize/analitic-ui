<script setup lang="ts">
defineProps<{ pair: [string, string] }>();
</script>

<template>
  <Button as-child size="sm" variant="outline">
    <NuxtLink :to="{ name: 'Correlation pair', params: { pair } }">
      Open details
    </NuxtLink>
  </Button>
</template>
