import { index, numeric, pgTable, uuid } from "drizzle-orm/pg-core";

import clientsTable from "./clients-table";
import projectsTable from "./projects-table";
import timestamps from "./timestamp";
import usersTable from "./users-table";

const invoicesTable = pgTable(
  "invoices",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    projectId: uuid()
      .references(() => projectsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    clientId: uuid().references(() => clientsTable.id, {
      onDelete: "cascade",
    }),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    ...timestamps,
  },
  (invoice) => [
    index("user_project_idx").on(invoice.userId, invoice.projectId),
  ],
);

export type SelectInvoicesType = typeof invoicesTable.$inferSelect;
export type InsertInvoicesType = typeof invoicesTable.$inferInsert;
export default invoicesTable;
