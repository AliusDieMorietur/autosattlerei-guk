import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schemas/*.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.POSTGRES_URI ??
      "postgres://postgres:password@0.0.0.0:5432/main",
  },
});
