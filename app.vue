<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const colorMode = useColorMode();

function switchColorMode() {
  colorMode.value = colorMode.value === "light" ? "dark" : "light";
}

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
    <UContainer as="header" class="mb-4 flex items-center justify-between">
      <UNavigationMenu :items="navItems" color="neutral" variant="link" />
      <UButton
        icon="i-radix-icons-half-2"
        variant="ghost"
        @click="switchColorMode"
      />
    </UContainer>

    <nuxt-page />
  </UApp>
</template>
