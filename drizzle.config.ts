import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/database/schemas",
  out: "./src/lib/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
