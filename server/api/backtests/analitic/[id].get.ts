import { Position, getTradesSummary } from "@tradalize/core";
import type { Trade } from "@tradalize/drizzle-adapter/dist/pg";
import { getBacktest } from "@tradalize/drizzle-adapter/dist/pg/index.js";
import type { AnaliticTrade } from "@/server/types";

export default defineEventHandler(async (event) => {
  const { dbUrl } = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");

  const backtest = await getBacktest(dbUrl, {
    id: Number(id),
    withTrades: true,
  });

  const { trades, ...rest } = backtest;

  return {
    ...rest,
    trades: trades
      .filter((t) => t.closeTime)
      .map((t) => ({ ...t, pnl: calcPnl(t) } as AnaliticTrade)),
    summary: getTradesSummary(backtest?.trades as Position[]),
  };
});

function calcPnl(trade: Trade) {
  if (!trade.closePrice) {
    return 0;
  }

  return (
    ((trade.closePrice - trade.openPrice) / trade.openPrice) * trade.direction
  );
}
