<script setup lang="ts">
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const navItems = [
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
  <header class="border-b">
    <div class="container mx-auto">
      <NavigationMenu class="py-2">
        <NavigationMenuList>
          <NavigationMenuItem v-for="{ to, label } in navItems">
            <NuxtLink :to>
              <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                {{ label }}
              </NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </header>

  <main class="container mx-auto py-4">
    <nuxt-page />
  </main>
</template>
