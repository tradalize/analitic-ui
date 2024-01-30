import type { Trade } from "@tradalize/drizzle-adapter/dist/pg";

export function calcTradePnl(trade: Trade) {
  if (!trade.closePrice) {
    return 0;
  }

  return (
    ((trade.closePrice - trade.openPrice) / trade.openPrice) * trade.direction
  );
}
