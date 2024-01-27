import type {
  IChartApi,
  LineSeriesPartialOptions,
  OhlcData,
} from "lightweight-charts";
import type { EMAParams } from "./EMA";
import type { BollingerBandsParams } from "./BollingerBands";
import type { ObjectValues } from "@/utils/utility.types";
import type { SupportedIndicators } from ".";

export type IndicatorsParams = EMAParams | BollingerBandsParams;

export type IndicatorProps<
  IndicatorParams = IndicatorsParams,
  LineParams = LineSeriesPartialOptions
> = {
  chart: IChartApi;
  candles: OhlcData[];
  lineParams?: LineParams;
  indicatorParams: IndicatorParams;
};

export type SupportedIndicators = ObjectValues<typeof SupportedIndicators>;

export type IndicatorRecord<LineParams = LineSeriesPartialOptions> = {
  key: SupportedIndicators;
  indicatorParams?: IndicatorsParams;
  lineParams?: LineParams;
};
