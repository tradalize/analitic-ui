<script setup lang="ts">
import type { Backtest } from "@tradalize/drizzle-adapter/dist/pg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const { data: backtests, refresh: refreshBacktests } = await useFetch<
  Backtest[]
>("/api/backtests");

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
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Strategy name</TableHead>
        <TableHead>Symbol</TableHead>
        <TableHead>Timeframe</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="backtest in backtests" :key="backtest.id">
        <TableCell>{{ backtest.id }}</TableCell>
        <TableCell>{{ backtest.strategyName }}</TableCell>
        <TableCell>{{ backtest.strategyParams?.symbol }}</TableCell>
        <TableCell>{{ backtest.strategyParams?.timeframe }}</TableCell>
        <TableCell>
          <div class="flex gap-4 justify-center">
            <Button size="sm" :to="`/backtests/${backtest.id}`"> Open </Button>

            <Button
              variant="destructive"
              size="sm"
              :loading="deleteStatus === 'pending'"
              @click="deleteHandler(backtest.id)"
            >
              Delete
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
