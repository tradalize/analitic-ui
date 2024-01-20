import type { InjectionKey } from "vue";
import type { AnaliticTrade } from "@/server/types";

interface TradeDetailsModalApi {
  openModal: (trade: AnaliticTrade) => void;
  closeModal: () => void;
}

export const TradeDetailsModalKey: InjectionKey<TradeDetailsModalApi> = Symbol(
  "trade-details-modal-api"
);
