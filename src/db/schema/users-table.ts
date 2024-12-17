import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import timestamps from "./timestamp";

const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  appwriteId: integer().unique().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 320 }).unique().notNull(),
  //   password: varchar({ length: 255 }).notNull(),
  // image: varchar({ length: 2048 }),
  ...timestamps,
});

export type SelectUsersType = typeof usersTable.$inferSelect;
export type InsertUsersType = typeof usersTable.$inferInsert;
export default usersTable;
