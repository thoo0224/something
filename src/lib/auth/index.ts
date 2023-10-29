import DiscordProvider from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthConfig } from "next-auth";

import { db } from "../database";

import { env } from "@/env.mjs";
import NextAuth from "next-auth";

const authOptions: NextAuthConfig = {
  secret: env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;

      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authOptions);
