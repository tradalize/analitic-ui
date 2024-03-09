import { Position, Timeframe } from "@tradalize/core";

export type AnaliticTrade = Position & {
  closePrice: number;
  closeTime: number;
  pnl: number;
};

export type ExchangeInfoQuery = {
  symbol: string;
  interval: Timeframe;
  startTime: number;
  endTime?: number;
  limit?: number;
};

export type RawBinanceKline = [
  number, // Open time
  string, // Open
  string, // High
  string, // Low
  string, // Close
  string, // Volume
  number, // Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Ignore.
];
