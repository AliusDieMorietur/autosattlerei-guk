import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;
import { schema } from "./schemas";
import { config } from "../lib/config";

export const newDb = () => {
  const pool = new Pool({
    connectionString: config.postgresUrl,
  });

  return drizzle(pool, { schema });
};

export const db = newDb();

export type DBInstance = typeof db;
