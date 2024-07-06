import type { CorrelationItem } from "@/components/correlations/types";

export default defineEventHandler(async (event) => {
  const { arbitrageApiUrl } = useRuntimeConfig(event);

  return $fetch<CorrelationItem[]>("/correlation-matrix", {
    baseURL: arbitrageApiUrl,
    cache: "force-cache",
  });
});
