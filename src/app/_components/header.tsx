import Link from "next/link";

import { auth } from "@/lib/auth";

import { UserDropdown } from "./user-dropdown";

export async function Header() {
  const session = await auth();
  if (!session) return <h1>Unauthorized.</h1>;

  return (
    <header className="border-b border-content2">
      <div className="container flex items-center justify-between p-4">
        <Link href="/" className="font-bold">
          CFXSomething
        </Link>

        <UserDropdown
          username={session.user?.name ?? "Unknown"}
          avatar={session.user?.image ?? undefined}
        />
      </div>
    </header>
  );
}
