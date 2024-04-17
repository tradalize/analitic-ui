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
  timeframe: Timeframe;
};

export async function useFXOpenChartData({
  symbol,
  startTime,
  timeframe,
}: Params) {
  const fxOPenTimeframe = timeframesMap.get(timeframe) ?? timeframe;

  const { data, pending } = await useFetch<{ Bars: RawKline[] }>(
    `api/v2/quotehistory/${symbol}/${fxOPenTimeframe}/bars/ask`,
    {
      cache: "default",
      baseURL: FX_OPEN_API_HOST,
      query: {
        timestamp: startTime,
        count: 300,
      },
      headers: {
        Authorization:
          "Basic 333be997-0bd5-4c30-98a0-1aadc17a6adf:DM445HnYZGmrPqqg:bGEWkWberQ7z5cMyQggKhKn7MSTW4DEp4dASrCqN2eb7s7mc83DmsFSAsGgCbqkY",
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
