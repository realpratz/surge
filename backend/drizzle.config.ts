import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "../.env" });

export default defineConfig({
  dialect: "postgresql",
  out: "./src/drizzle",
  schema: "./src/drizzle/schema.ts",
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.PGPORT!),
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
    ssl: false,
  },
  verbose: true,
  strict: true,
});
