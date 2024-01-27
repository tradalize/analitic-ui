export * from "./EMA";
export * from "./BollingerBands";

export const SupportedIndicators = {
  ema: "ema",
  bb: "bollingerBands",
} as const;
