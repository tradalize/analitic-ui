import { TIMEFRAME, type Timeframe } from "@tradalize/core";
import type { OhlcData, UTCTimestamp } from "lightweight-charts";

const FX_OPEN_API_HOST = "https://ttlivewebapi.fxopen.net:8443";

type RawKline = {
  Volume: number;
  Close: number;
  Low: number;
  High: number;
  Open: number;
  Timestamp: number;
};

type Params = {
  symbol: string;
  startTime: number;
  endTime?: number;
  timeframe: Timeframe;
};

export async function useFXOpenChartData({
  symbol,
  startTime,
  endTime,
  timeframe,
}: Params) {
  const fxOPenTimeframe = timeframesMap.get(timeframe) ?? timeframe;

  const { data, pending } = await useFetch<{ Bars: RawKline[] }>(
    `/api/v2/public/quotehistory/${symbol}/${fxOPenTimeframe}/bars/ask`,
    {
      cache: "default",
      baseURL: FX_OPEN_API_HOST,
      query: {
        timestamp: startTime,
        count: getCount({ timeframe, startTime, endTime }),
      },
      default: () => ({ Bars: [] }),
    }
  );

  return {
    candles: data.value.Bars.map(rawKlineToCandlestick),
    pending,
  };
}

function rawKlineToCandlestick({
  Timestamp,
  Open,
  High,
  Low,
  Close,
}: RawKline): OhlcData {
  return {
    time: (Timestamp / 1000) as UTCTimestamp,
    open: Open,
    high: High,
    low: Low,
    close: Close,
  };
}

const timeframesMap = new Map<Timeframe, string>([
  [TIMEFRAME.FiveMinutes, "M5"],
]);

const timeframeDurationsMap = new Map<Timeframe, number>([
  [TIMEFRAME.FiveMinutes, 5 * 60 * 1000],
]);

function getCount({
  timeframe,
  startTime,
  endTime,
}: {
  timeframe: Timeframe;
  startTime: number;
  endTime?: number;
}) {
  const timeframeDuration = timeframeDurationsMap.get(timeframe);

  if (!endTime || !timeframeDuration) {
    return 100;
  }

  return Math.floor((endTime - startTime) / timeframeDuration);
}
