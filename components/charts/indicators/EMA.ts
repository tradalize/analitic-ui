import type { LineSeriesPartialOptions } from "lightweight-charts";
import { EMA } from "@debut/indicators";
import type { IndicatorProps } from "./types";

type EMAProps = IndicatorProps<LineSeriesPartialOptions, { period: number }>;

export function addEma({
  chart,
  lineProps,
  candles,
  indicatorProps: { period },
}: EMAProps) {
  const ema = new EMA(period);

  const seriesData = [];

  for (const { time, close } of candles) {
    const value = ema.nextValue(close);

    if (value) {
      seriesData.push({ time, value });
    }
  }

  const series = chart.addLineSeries(lineProps);
  series.setData(seriesData);
}
