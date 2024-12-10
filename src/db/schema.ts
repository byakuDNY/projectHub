import {
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
};

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  appwriteId: integer().unique().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  //   password: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export const clientsTable = pgTable("clients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  phone: varchar({ length: 255 }).unique().notNull(),
  ...timestamps,
});

const projectStatusEnum = pgEnum("status", ["active", "inactive"]);

export const projectsTable = pgTable(
  "projects",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    userId: integer()
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    clientId: integer()
      .references(() => clientsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    status: projectStatusEnum().default("active").notNull(),
    endDate: timestamp(),
    ...timestamps,
  },
  (projects) => [
    index("user_client_idx").on(projects.userId, projects.clientId),
  ],
);

export const invoicesTable = pgTable(
  "invoices",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    projectId: integer()
      .references(() => projectsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    clientId: integer().references(() => clientsTable.id, {
      onDelete: "cascade",
    }),
    amount: integer().notNull(),
    ...timestamps,
  },
  (invoice) => [
    index("user_project_idx").on(invoice.userId, invoice.projectId),
  ],
);

const paymentStatusEnum = pgEnum("status", [
  "pending",
  "completed",
  "cancelled",
  "refunded",
]);

export const paymentsTable = pgTable("payments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  invoiceId: integer()
    .references(() => invoicesTable.id, { onDelete: "cascade" })
    .notNull(),
  userId: integer()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  amount: numeric({ precision: 10, scale: 2 }).notNull(),
  status: paymentStatusEnum().default("pending").notNull(),
  method: varchar({ length: 255 }).notNull(),
  ...timestamps,
});
