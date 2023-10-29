import { createSafeActionClient } from "next-safe-action";

import { auth } from "./auth";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const session = await auth();
    if (!session) {
      throw new Error("Session not found.");
    }

    if (!session.user) {
      throw new Error("Invalid user in session");
    }

    return {
      user: session.user,
    };
  },
});
