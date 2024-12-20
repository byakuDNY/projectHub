import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import timestamps from "./timestamp";
import usersTable from "./users-table";

const clientsTable = pgTable("clients", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).unique().notNull(),
  email: varchar({ length: 320 }).unique().notNull(),
  description: varchar({ length: 255 }),
  contact: varchar({ length: 255 }),
  phone: varchar({ length: 255 }).unique().notNull(),
  country: varchar({ length: 255 }).notNull(),
  ...timestamps,
  userId: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
});

export type SelectClientsType = typeof clientsTable.$inferSelect;
export type InsertClientsType = typeof clientsTable.$inferInsert;
export default clientsTable;
