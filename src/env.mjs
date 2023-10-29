import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),

    NEXTAUTH_SECRET: z.string().default("OK"),
    NEXTAUTH_URL: z.string().default("http://localhost:3000"),

    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
  },
});
