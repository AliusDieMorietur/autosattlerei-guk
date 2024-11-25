import dotenv from "dotenv";
dotenv.config();

export const config = {
  secretToken: process.env.SECRET_TOKEN || "42",
  postgresUrl:
    process.env.POSTGRES_URL ||
    "postgres://postgres:password@0.0.0.0:5432/main",
};
