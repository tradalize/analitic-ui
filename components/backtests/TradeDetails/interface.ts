import type { InjectionKey } from "vue";
import type { AnaliticTrade } from "@/server/types";
import type { DeepReadonly } from "vue";
import type { IndicatorRecord } from "./TradeChart/indicators/types";
import type { LineSeriesPartialOptions } from "lightweight-charts";

interface TradeDetailsModalApi {
  openModal: (trade: AnaliticTrade) => void;
  closeModal: () => void;
}

export const TradeDetailsModalKey: InjectionKey<TradeDetailsModalApi> = Symbol(
  "trade-details-modal-api"
);

export interface IndicatorsListApi {
  indicators: DeepReadonly<IndicatorRecord[]>;
  indicatorsLinesParams: Record<string, Partial<LineSeriesPartialOptions>>;
}

export const IndicatorsListKey: InjectionKey<IndicatorsListApi> = Symbol(
  "indicators-list-api"
);
