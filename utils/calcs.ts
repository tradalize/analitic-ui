import type { Trade } from "@tradalize/drizzle-adapter/dist/pg";

export function calcTradePnl(trade: Trade) {
  if (!trade.closePrice) {
    return 0;
  }

  return (
    ((trade.closePrice - trade.openPrice) / trade.openPrice) * trade.direction
  );
}

export function decimalCount(number: number | string) {
  const numberAsString = String(number);

  if (numberAsString.includes(".")) {
    return numberAsString.split(".")[1].length;
  }

  return 0;
}
