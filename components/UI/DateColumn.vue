<script setup lang="ts">
import { format } from "date-fns";

defineProps<{ date: string | number }>();
</script>

<template>
  {{ format(new Date(date), "dd MMM y HH:mm:ss") }}
</template>
