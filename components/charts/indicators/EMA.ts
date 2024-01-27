import type { LineSeriesPartialOptions } from "lightweight-charts";
import { EMA } from "@debut/indicators";
import type { IndicatorProps } from "./types";

export type EMAParams = { period: number };

type EMAProps = IndicatorProps<EMAParams>;

export function addEma({
  chart,
  lineParams,
  candles,
  indicatorParams: { period },
}: EMAProps) {
  const ema = new EMA(period);

  const seriesData = [];

  for (const { time, close } of candles) {
    const value = ema.nextValue(close);

    if (value) {
      seriesData.push({ time, value });
    }
  }

  const series = chart.addLineSeries(lineParams);
  series.setData(seriesData);
}
