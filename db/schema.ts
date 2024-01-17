import {
  pgTable,
  serial,
  doublePrecision,
  timestamp,
  text,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const backtests = pgTable("backtests", {
  id: serial("id").primaryKey(),
  strategyName: text("strategy_name").notNull(),
  strategyParams: jsonb("strategy_params"),
});

const backtestsRelations = relations(backtests, ({ many }) => ({
  trades: many(trades),
}));

export const trades = pgTable("trades", {
  id: serial("id").primaryKey().notNull(),
  direction: integer("direction"),
  open: doublePrecision("open").notNull(),
  openTime: timestamp("openTime").notNull(),
  close: doublePrecision("close"),
  closeTime: timestamp("closeTime"),
  backtestId: integer("backtest_id"),
});

const tradesRelations = relations(trades, ({ one }) => ({
  backtest: one(backtests, {
    fields: [trades.backtestId],
    references: [backtests.id],
  }),
}));

export default { backtests, backtestsRelations, trades, tradesRelations };
