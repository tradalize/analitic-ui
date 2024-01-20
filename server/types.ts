import { Position } from "@tradalize/core";

export type AnaliticTrade = Position & {
  closePrice: number;
  closeTime: number;
  pnl: number;
};
