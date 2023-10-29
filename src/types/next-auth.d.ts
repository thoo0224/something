import type { User } from "next-auth";
import "next-auth/jwt";

import type { UserId } from "../lib/db/schema/auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}
