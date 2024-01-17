import { getBacktests } from "@/db/handlers/getBacktests";

export default defineEventHandler(async (event) => {
  const { dbUrl } = useRuntimeConfig(event);

  return getBacktests(dbUrl);
});
