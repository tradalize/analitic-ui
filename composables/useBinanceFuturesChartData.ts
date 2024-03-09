import type { Timeframe } from "@tradalize/core";
import type { OhlcData, UTCTimestamp } from "lightweight-charts";

const BINANCE_FUTURES_API_HOST = "https://fapi.binance.com";

type RawKline = [
  number, // Open time
  string, // Open
  string, // High
  string, // Low
  string, // Close
  string, // Volume
  number, // Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Ignore.
];

type Params = {
  symbol: string;
  startTime: number;
  endTime?: number;
  interval: Timeframe;
  limit?: number;
};

export async function useBinanceFuturesChartData({
  symbol,
  startTime,
  endTime = Date.now(),
  interval,
  limit = 1500,
}: Params) {
  const { data, pending } = await useFetch<RawKline[]>("/fapi/v1/klines", {
    cache: "default",
    baseURL: BINANCE_FUTURES_API_HOST,
    query: {
      symbol,
      startTime,
      endTime,
      interval,
      limit,
    },
    default: () => [],
  });

  return {
    candles: data.value.map(rawKlineToCandlestick),
    pending,
  };
}

function rawKlineToCandlestick([
  openTime,
  open,
  high,
  low,
  close,
]: RawKline): OhlcData {
  return {
    time: (openTime / 1000) as UTCTimestamp,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
  };
}
