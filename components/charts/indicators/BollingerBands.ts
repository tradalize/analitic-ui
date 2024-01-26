import type { LineSeriesPartialOptions, LineData } from "lightweight-charts";
import { BollingerBands } from "@debut/indicators";
import type { IndicatorProps } from "./types";

type BollingerBandsProps = IndicatorProps<
  never,
  { period: number; stdDev: number }
>;

export function addBollingerBands({
  chart,
  candles,
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

  const bbUpperSeries = chart.addLineSeries({
    title: "BB upper",
    priceLineVisible: false,
    lineWidth: 1,
  });
  bbUpperSeries.setData(upperSeries);

  const bbLowerSeries = chart.addLineSeries({
    title: "BB lower",
    priceLineVisible: false,
    lineWidth: 1,
  });
  bbLowerSeries.setData(lowerSeries);
}
