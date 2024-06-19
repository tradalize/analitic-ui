import { getDbClient } from "@tradalize/drizzle-adapter/dist/pg/index.js";
import type { DefaultStrategyParams } from "@tradalize/drizzle-adapter/dist/pg";
import { getTradesSummary, Position } from "@tradalize/core";

type QueryParams = {
  strategyName?: string;
  symbol?: string;
  timeframe?: string;
};

export default defineEventHandler(async (event) => {
  const { dbUrl } = useRuntimeConfig(event);
  const { strategyName, symbol, timeframe } = getQuery<QueryParams>(event);

  const { db } = getDbClient(dbUrl);

  const backtests = await db.query.backtests.findMany({
    with: {
      trades: true,
    },
    where: (bt, { like, and, sql }) => {
      const params = [];

      if (strategyName) {
        params.push(like(bt.strategyName, strategyName));
      }

      if (symbol) {
        params.push(sql`${bt.strategyParams}->'symbol' = ${symbol}`);
      }

      if (timeframe) {
        params.push(sql`${bt.strategyParams}->'timeframe' = ${timeframe}`);
      }

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
