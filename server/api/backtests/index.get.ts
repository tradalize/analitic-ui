import {
  getBacktests,
  getDbClient,
} from "@tradalize/drizzle-adapter/dist/pg/index.js";

export default defineEventHandler(async (event) => {
  const { dbUrl } = useRuntimeConfig(event);

  const { db } = getDbClient(dbUrl);

  return db.query.backtests.findMany({
    orderBy: (bt, { desc }) => [desc(bt.id)],
  });
});
