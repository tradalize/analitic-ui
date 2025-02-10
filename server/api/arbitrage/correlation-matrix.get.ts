import type { CorrelationItem } from "@/components/correlations/types";
import { subDays } from "date-fns";

export default defineEventHandler(async (event) => {
  const { arbitrageApiUrl } = useRuntimeConfig(event);

  const endTime = new Date().getTime();
  const startTime = subDays(endTime, 90).getTime();

  return $fetch<CorrelationItem[]>(
    `/correlation-matrix?timeframe=1d&start_time=${startTime}&end_time=${endTime}`,
    {
      baseURL: arbitrageApiUrl,
    }
  );
});
