import { getDbClient } from "../dbClient";

export function getBacktests(dbUrl: string) {
  const db = getDbClient(dbUrl);

  return db.query.backtests.findMany();
}
