"use server";

import { revalidatePath } from "next/cache";

import { server } from "@/lib/database/schemas/server";
import { authAction } from "@/lib/safe-actions";
import { db } from "@/lib/database";
import { auth } from "@/lib/auth";

import { z } from "zod";
import { eq } from "drizzle-orm";

export const createServerAction = authAction(
  z.object({
    name: z.string().min(3).max(64),
  }),
  async ({ name }, { user }) => {
    await db
      .insert(server)
      .values({
        name,
        owner: user.id,
      })
      .returning();

    revalidatePath("/dashboard");
    return {
      success: "Successfully created the server.",
    };
  }
);

export const deleteServerAction = authAction(
  z.object({
    id: z.string(),
  }),
  async ({ id }, { user }) => {
    return await db.transaction(async (tx) => {
      const [targetServer] = await db
        .select()
        .from(server)
        .where(eq(server.id, id));
      if (!targetServer)
        return {
          failure: "Server not found.",
        };

      if (targetServer.owner != user.id)
        return {
          failure: "You are not the owner of this server.",
        };

      await db.delete(server).where(eq(server.id, id));

      revalidatePath("/dashboard");
      return {
        success: "Successfully deleted the server!",
      };
    });
  }
);
