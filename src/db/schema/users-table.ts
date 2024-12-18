import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import timestamps from "./timestamp";

const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  appwriteId: varchar({ length: 255 }).unique().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 320 }).unique().notNull(),
  // avatar: varchar({ length: 2048 }),
  //   password: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export type SelectUsersType = typeof usersTable.$inferSelect;
export type InsertUsersType = typeof usersTable.$inferInsert;
export default usersTable;
