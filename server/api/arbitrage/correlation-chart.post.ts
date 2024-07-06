import { Timeframe } from "@tradalize/core";
import { LineData } from "lightweight-charts";

type CorrData = {
  corrScores: {
    correlationScore: number;
    std: number;
    spread: number;
    zScore: number;
  };
  data: {
    asset1: LineData[];
    asset2: LineData[];
    spread: LineData[];
    zScore: LineData[];
  };
};

export default defineEventHandler<{
  body: {
    symbol1: string;
    symbol2: string;
    timeframe: Timeframe;
    start?: number;
    end?: number;
  };
}>(async (event) => {
  const { arbitrageApiUrl } = useRuntimeConfig(event);

  const { symbol1, symbol2, timeframe, start, end } = await readBody(event);

  return $fetch<CorrData>("/corr-chart", {
    baseURL: arbitrageApiUrl,
    method: "POST",
    body: {
      asset1: symbol1,
      asset2: symbol2,
      timeframe,
      start,
      end,
    },
  });
});
