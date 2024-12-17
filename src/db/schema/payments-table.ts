import { numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import invoicesTable from "./invoices-table";
import timestamps from "./timestamp";
import usersTable from "./users-table";

const paymentsTable = pgTable("payments", {
  id: uuid().primaryKey().defaultRandom(),
  invoiceId: uuid()
    .references(() => invoicesTable.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  amount: numeric({ precision: 10, scale: 2 }).notNull(),
  status: varchar({ length: 255 }).default("pending").notNull(),
  method: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export type SelectPaymentsType = typeof paymentsTable.$inferSelect;
export type InsertPaymentsType = typeof paymentsTable.$inferInsert;
export default paymentsTable;
