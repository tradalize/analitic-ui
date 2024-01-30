import { getDbClient } from "@tradalize/drizzle-adapter/dist/pg/index.js";
import type { Backtest, DefaultStrategyParams } from "@tradalize/drizzle-adapter/dist/pg";
import { getTradesSummary, Position } from "@tradalize/core";

export default defineEventHandler(async (event) => {
  const { dbUrl } = useRuntimeConfig(event);
  const query = getQuery(event);

  const { db } = getDbClient(dbUrl);

  const backtests = await db.query.backtests.findMany({
    with: {
      trades: {
        where: (trade, { isNotNull }) => isNotNull(trade.closePrice),
      },
    },
    where: (bt, { like, and }) => {
      const params = Object.entries(query)
        .map(([key, value]) => {
          if (!!value && typeof value === "string") {
            return like(bt[key as keyof Backtest], value);
          }
        })
        .filter(Boolean);

      return and(...params);
    },
    orderBy: (bt, { desc }) => [desc(bt.id)],
  });

  return backtests.map((bt) => {
    const { id, strategyParams, trades } = bt;

    return {
      id,
      strategyParams: strategyParams as DefaultStrategyParams,
      ...getTradesSummary(trades as Position[]),
    };
  });
});
