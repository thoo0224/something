import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const server = pgTable("servers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 64 }).notNull(),
  owner: varchar("owner", { length: 128 }).notNull(),
});

export const insertServerSchema = createInsertSchema(server);
export const selectServerSchema = createSelectSchema(server);

export type NewServer = z.infer<typeof insertServerSchema>;
export type Server = z.infer<typeof selectServerSchema>;
