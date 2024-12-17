import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import projectsTable from "./projects-table";

const projectKVTable = pgTable("project_kv", {
  id: uuid().primaryKey().defaultRandom(),
  projectId: uuid()
    .references(() => projectsTable.id, { onDelete: "cascade" })
    .notNull(),
  key: varchar({ length: 255 }).notNull(),
  value: varchar({ length: 255 }).notNull(),
});

export type SelectProjectKVType = typeof projectKVTable.$inferSelect;
export type InsertProjectKVType = typeof projectKVTable.$inferInsert;
export default projectKVTable;
