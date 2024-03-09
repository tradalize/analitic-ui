import type { OhlcData, UTCTimestamp } from "lightweight-charts";
import type { RawBinanceKline } from "../server/types";

export function binanceKlineToCandlestick([
  openTime,
  open,
  high,
  low,
  close,
]: RawBinanceKline): OhlcData {
  return {
    time: (openTime / 1000) as UTCTimestamp,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
  };
}
