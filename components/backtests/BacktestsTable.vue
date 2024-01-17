<script setup lang="ts">
// import { useQuery } from "@tanstack/vue-query";
// import { apiClient } from "@/libs/apiClient";
// import { Backtest } from "@/types";

// const { data: backtests, refetch } = useQuery({
//   queryFn: async () => {
//     const { data } = await apiClient.get<Backtest[]>("/backtest");

//     return data;
//   },
// });

// const deleteHandler = async (id: number) => {
//   await apiClient.delete(`/backtest/${id}`);

//   refetch();
// };
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
        <td>{{ backtest.symbol }}</td>
        <td>{{ backtest.timeframe }}</td>
        <td>
          <div class="d-flex" :style="{ gap: '1rem' }">
            <v-btn
              variant="tonal"
              :to="{
                name: 'Backtest',
                params: {
                  id: backtest.id,
                },
              }"
            >
              Open
            </v-btn>

            <v-btn
              variant="tonal"
              color="error"
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
