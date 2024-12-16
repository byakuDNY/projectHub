import {
  date,
  index,
  numeric,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import clientsTable from "./clients-table";
import timestamps from "./timestamp";
import usersTable from "./users-table";

const projectsTable = pgTable(
  "projects",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    content: text(),
    userId: uuid()
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    clientId: uuid()
      .references(() => clientsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    budget: numeric({ precision: 10, scale: 2 }).notNull(),
    status: varchar({ length: 255 }).default("active").notNull(),
    startDate: date().defaultNow().notNull(),
    endDate: date().notNull(),
    ...timestamps,
  },
  (projects) => [
    index("user_client_idx").on(projects.userId, projects.clientId),
  ],
);

export type ProjectsType = typeof projectsTable.$inferInsert;
export default projectsTable;
