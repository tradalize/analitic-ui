import { deleteBacktests } from "@tradalize/drizzle-adapter/dist/pg/index.js";

export default defineEventHandler(async (event) => {
  const { dbUrl } = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");

  await deleteBacktests(dbUrl, Number(id));

  return;
});
