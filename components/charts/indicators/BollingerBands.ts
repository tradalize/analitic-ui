import type { LineSeriesPartialOptions, LineData } from "lightweight-charts";
import { BollingerBands } from "@debut/indicators";
import type { IndicatorProps } from "./types";

type BollingerBandsProps = IndicatorProps<
  LineSeriesPartialOptions,
  { period: number; stdDev: number }
>;

export function addBollingerBands({
  chart,
  candles,
  lineProps = { lineWidth: 1 },
  indicatorProps,
}: BollingerBandsProps) {
  const bb = new BollingerBands(indicatorProps.period, indicatorProps.stdDev);

  const { upperSeries, lowerSeries } = candles.reduce(
    (acc, { time, close }) => {
      const bbValue = bb.nextValue(close);

      if (bbValue) {
        acc.upperSeries.push({ time, value: bbValue.upper });
        acc.lowerSeries.push({ time, value: bbValue.lower });
      }

      return acc;
    },
    {
      upperSeries: [] as LineData[],
      lowerSeries: [] as LineData[],
    }
  );

  const bbLowerSeries = chart.addLineSeries(lineProps);
  bbLowerSeries.setData(lowerSeries);

  const bbUpperSeries = chart.addLineSeries(lineProps);
  bbUpperSeries.setData(upperSeries);
}
