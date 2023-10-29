import { Button } from "@nextui-org/button";

import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return <Button>Test</Button>;
}
