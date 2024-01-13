<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer>
        <v-list nav>
          <v-list-item title="Home" to="/" exact />
          <v-list-item title="Backtests" :to="{ name: 'Backtests' }" />
          <v-list-item
            title="Compare backtests"
            :to="{ name: 'CompareBacktests' }"
          />
          <v-list-item title="Models" :to="{ name: 'Models' }" />
          <v-list-item title="Sandbox" :to="{ name: 'Sandbox' }" />
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
