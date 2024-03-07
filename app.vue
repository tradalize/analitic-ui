<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer>
        <v-list nav>
          <v-list-item title="Home" :to="{ name: 'Home' }" exact />
          <v-list-item title="Backtests" :to="{ name: 'Backtests' }" />
          <v-list-item
            title="Compare backtests"
            :to="{ name: 'Compare backtests' }"
          />
          <v-list-item title="Correlations" :to="{ name: 'Correlations' }" />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <div class="pa-4 overflow-y-auto h-screen">
          <nuxt-page />
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>
