<script setup lang="ts">
import { POSITION_DIRECTION, type PositionDirection } from "@tradalize/core";

defineProps<{ direction: PositionDirection }>();
</script>

<template>
  {{ direction === POSITION_DIRECTION.Long ? "Long" : "Short" }}
</template>
