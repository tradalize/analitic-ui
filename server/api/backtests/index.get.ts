import { getBacktests } from "@tradalize/drizzle-adapter/dist/pg/index.js";

export default defineEventHandler(async (event) => {
  const { dbUrl } = useRuntimeConfig(event);

  return getBacktests(dbUrl);
});
