import type { InjectionKey } from "vue";
import type { AnaliticTrade } from "@/server/types";
import type {
  SupportedIndicators,
  IndicatorRecord,
} from "@/components/charts/indicators/types";
import type { DeepReadonly } from "vue";

interface TradeDetailsModalApi {
  openModal: (trade: AnaliticTrade) => void;
  closeModal: () => void;
}

export const TradeDetailsModalKey: InjectionKey<TradeDetailsModalApi> = Symbol(
  "trade-details-modal-api"
);

interface IndicatorsListApi {
  indicators: DeepReadonly<IndicatorRecord[]>;
  addIndicator: (key: SupportedIndicators) => void;
  removeIndicator: (index: number) => void;
}

export const IndicatorsListKey: InjectionKey<IndicatorsListApi> = Symbol(
  "indicators-list-api"
);
