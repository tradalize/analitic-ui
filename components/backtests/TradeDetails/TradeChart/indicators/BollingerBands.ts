import type { LineData } from "lightweight-charts";
import { BollingerBands } from "@debut/indicators";
import type { IndicatorProps } from "./types";

export type BollingerBandsParams = { period: number; stdDev: number };

type BollingerBandsProps = IndicatorProps<BollingerBandsParams>;

export function addBollingerBands({
  chart,
  candles,
  indicatorParams,
  lineParams,
}: BollingerBandsProps) {
  const bb = new BollingerBands(indicatorParams.period, indicatorParams.stdDev);

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
    ...lineParams,
    title: "BB upper",
    priceLineVisible: false,
  });
  bbUpperSeries.setData(upperSeries);

  const bbLowerSeries = chart.addLineSeries({
    ...lineParams,
    title: "BB lower",
    priceLineVisible: false,
  });
  bbLowerSeries.setData(lowerSeries);
}
