import { subDays, addDays } from "date-fns";
import type { AnaliticTrade } from "@/server/types";

export function getTimeframeInterval(trade: AnaliticTrade) {
  switch (trade.timeframe) {
    case "1d":
      return {
        startTime: subDays(new Date(trade.openTime), 51).getTime(),
        endTime: addDays(new Date(trade.closeTime), 30).getTime(),
      };

    case "4h":
      return {
        startTime: subDays(new Date(trade.openTime), 14).getTime(),
        endTime: addDays(new Date(trade.closeTime), 14).getTime(),
      };

    default:
      return {
        startTime: subDays(new Date(trade.openTime), 2).getTime(),
        endTime: addDays(new Date(trade.closeTime), 2).getTime(),
      };
  }
}
