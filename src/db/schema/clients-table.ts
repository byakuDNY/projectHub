import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import timestamps from "./timestamp";

const clientsTable = pgTable("clients", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).unique().notNull(),
  // description: varchar({ length: 255 }),
  // contact: varchar({ length: 255 }),
  email: varchar({ length: 320 }).unique().notNull(),
  phone: varchar({ length: 255 }).unique().notNull(),
  country: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export type ClientsType = typeof clientsTable.$inferInsert;
export default clientsTable;
