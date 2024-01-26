import type { IChartApi, OhlcData } from "lightweight-charts";

export type IndicatorProps<LineProps, IndicatorProps> = {
  chart: IChartApi;
  candles: OhlcData[];
  lineProps?: LineProps;
  indicatorProps: IndicatorProps;
};
