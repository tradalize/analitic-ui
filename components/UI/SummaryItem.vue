<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div>
    <div class="font-bold">{{ title }}</div>
    <slot />
  </div>
</template>
