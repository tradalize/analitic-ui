<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const navItems: NavigationMenuItem[] = [
  {
    to: { name: "Home" },
    label: "Home",
  },
  {
    to: { name: "Backtests" },
    label: "Backtests",
  },
  {
    to: { name: "Compare backtests" },
    label: "Compare backtests",
  },
  {
    to: { name: "Correlations" },
    label: "Correlations",
  },
];
</script>

<template>
  <UApp>
    <UContainer as="header">
      <UNavigationMenu :items="navItems" color="neutral" variant="link" />
    </UContainer>

    <nuxt-page />
  </UApp>
</template>
