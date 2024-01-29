export * from "./EMA";
export * from "./BollingerBands";

export const SUPPORTED_INDICATORS = {
  ema: "ema",
  bb: "bollingerBands",
} as const;
