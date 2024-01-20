<script setup lang="ts">
defineProps<{ number: number }>();
</script>

<template>{{ (number * 100).toFixed(2) }}%</template>
