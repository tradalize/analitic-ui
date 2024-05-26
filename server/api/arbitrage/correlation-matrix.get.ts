type Matrix = Record<string, Record<string, number>>;

export default defineEventHandler(async (event) => {
  const { arbitrageApiUrl } = useRuntimeConfig(event);

  return $fetch<Matrix>("/correlation-matrix", {
    baseURL: arbitrageApiUrl,
    cache: "force-cache",
  });
});
