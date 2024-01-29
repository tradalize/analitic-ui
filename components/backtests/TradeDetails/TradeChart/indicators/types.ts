import type {
  IChartApi,
  LineSeriesPartialOptions,
  OhlcData,
} from "lightweight-charts";
import type { EMAParams } from "./EMA";
import type { BollingerBandsParams } from "./BollingerBands";
import type { ObjectValues } from "@/utils/utility.types";
import type { SUPPORTED_INDICATORS } from ".";

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

export type SupportedIndicators = ObjectValues<typeof SUPPORTED_INDICATORS>;

export type IndicatorRecord<LineParams = LineSeriesPartialOptions> = {
  key: SupportedIndicators | `/${SupportedIndicators}/`;
  indicatorParams?: IndicatorsParams;
  lineParams?: LineParams;
};
