import { timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
};

export default timestamps;
