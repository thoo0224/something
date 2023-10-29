import { eq } from "drizzle-orm";

import { server } from "../database/schemas/server";
import { db } from "../database";

export async function getServers(userId: string) {
  return await db.select().from(server).where(eq(server.owner, userId));
}
