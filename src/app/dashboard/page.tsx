import { getServers } from "@/lib/data/servers";
import { auth } from "@/lib/auth";

import { ServerList } from "./_components/server-list";

export default async function DashboardPage() {
  const session = await auth();
  if (!session || !session.user) return <span>Unauthorized.</span>;

  const servers = await getServers(session.user.id);
  return (
    <>
      <ServerList servers={servers} />
    </>
  );
}
