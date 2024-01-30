import { Position, getTradesSummary } from "@tradalize/core";
import type { Trade, Backtest } from "@tradalize/drizzle-adapter/dist/pg";
import { getBacktest } from "@tradalize/drizzle-adapter/dist/pg/index.js";
import type { AnaliticTrade } from "@/server/types";
import { calcTradePnl } from "@/utils/calcs";

export default defineEventHandler(async (event) => {
  const { dbUrl } = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");

  const backtest = (await getBacktest(dbUrl, {
    id: Number(id),
    withTrades: true,
  })) as Backtest & { trades: Trade[] };

  const { trades, ...rest } = backtest;

  return {
    ...rest,
    trades: trades
      .filter((t) => t.closeTime)
      .map((t) => ({ ...t, pnl: calcTradePnl(t) } as AnaliticTrade)),
    summary: getTradesSummary(backtest?.trades as Position[]),
  };
});
