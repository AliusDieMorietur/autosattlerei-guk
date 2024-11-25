import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./src/db";

migrate(db, {
  migrationsFolder: "./src/db/migrations",
});
