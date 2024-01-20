import { Position } from "@tradalize/core";

export type AnaliticTrade = Position & {
  pnl: number;
};
