import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import clientsTable from "./clients-table";
import timestamps from "./timestamp";
import usersTable from "./users-table";

const projectsTable = pgTable(
  "projects",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    userId: uuid()
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    clientId: uuid()
      .references(() => clientsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    status: varchar({ length: 255 }).default("active").notNull(),
    endDate: timestamp(),
    ...timestamps,
  },
  (projects) => [
    index("user_client_idx").on(projects.userId, projects.clientId),
  ],
);

export default projectsTable;
