import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle({
  connection: process.env.DATABASE_URL!,
});

export default db;
