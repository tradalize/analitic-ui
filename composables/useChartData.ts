import type { Timeframe } from "@tradalize/core";
import type { OhlcData } from "lightweight-charts";

type SupportedExchanges = "binance-futures" | "fx-open";

type Params = {
  exchange?: SupportedExchanges;
  symbol: string;
  startTime: number;
  endTime?: number;
  timeframe: Timeframe;
  limit?: number;
};

export type ChartData = {
  candles: OhlcData[];
  pending: Ref<boolean> | boolean;
};

export async function useChartData({
  exchange,
  symbol,
  startTime,
  endTime,
  timeframe,
  limit,
}: Params): Promise<ChartData> {
  const exchangeName = getExchangeName({ exchange, symbol });

  switch (exchangeName) {
    case "binance-futures": {
      return useBinanceFuturesChartData({
        symbol,
        timeframe,
        startTime,
        endTime,
        limit,
      });
    }

    case "fx-open": {
      return useFXOpenChartData({ symbol, timeframe, startTime });
    }

    default:
      return {
        candles: [],
        pending: false,
      };
  }
}

function getExchangeName({
  exchange,
  symbol,
}: Pick<Params, "exchange" | "symbol">): SupportedExchanges {
  if (exchange) {
    return exchange;
  }

  if (symbol.includes("USDT")) {
    return "binance-futures";
  }

  return "fx-open";
}
