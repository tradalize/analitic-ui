<script setup lang="ts">
const { data: backtests, refresh: refreshBacktests } = await useFetch(
  "/api/backtests"
);

const deleteId = ref<number>();
const { execute: deleteBacktest, status: deleteStatus } = useFetch(
  () => `/api/backtests/${deleteId.value}`,
  {
    method: "delete",
    immediate: false,
    onResponse: refreshBacktests,
  }
);

const deleteHandler = (id: number) => {
  deleteId.value = id;
  deleteBacktest();
};
</script>

<template>
  <v-table hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Strategy name</th>
        <th>Symbol</th>
        <th>Timeframe</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="backtest in backtests" :key="backtest.id">
        <td>{{ backtest.id }}</td>
        <td>{{ backtest.strategyName }}</td>
        <td>{{ backtest.strategyParams?.symbol }}</td>
        <td>{{ backtest.strategyParams?.timeframe }}</td>
        <td>
          <div class="d-flex" :style="{ gap: '1rem' }">
            <v-btn variant="tonal" :to="`/backtests/${backtest.id}`">
              Open
            </v-btn>

            <v-btn
              variant="tonal"
              color="error"
              :loading="deleteStatus === 'pending'"
              @click="deleteHandler(backtest.id)"
            >
              Delete
            </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
