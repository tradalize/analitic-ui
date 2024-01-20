import { getBacktests } from "@tradalize/drizzle-adapter/dist/pg";

export default defineEventHandler(async (event) => {
  const { dbUrl } = useRuntimeConfig(event);

  return getBacktests(dbUrl);
});
