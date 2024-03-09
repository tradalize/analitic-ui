import type { ExchangeInfoQuery, RawBinanceKline } from "@/server/types";
import { binanceKlineToCandlestick } from "@/utils/klineMappers";

const BINANCE_FUTURES_API_HOST = "https://fapi.binance.com";

export default defineEventHandler(async (event) => {
  const {
    symbol,
    interval,
    startTime,
    endTime,
    limit = 1500,
  } = getQuery<ExchangeInfoQuery>(event);

  const exchangeResponse = await $fetch<RawBinanceKline[]>("/fapi/v1/klines", {
    baseURL: BINANCE_FUTURES_API_HOST,
    method: "GET",
    query: {
      symbol,
      interval,
      startTime,
      endTime,
      limit,
    },
  });

  return exchangeResponse.map(binanceKlineToCandlestick);
});
