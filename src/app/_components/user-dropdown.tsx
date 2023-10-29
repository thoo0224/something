"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  avatar?: string | undefined;
  username: string;
};

export function UserDropdown({ avatar, username }: Props) {
  const router = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer"
          name={username}
          src={avatar}
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" className="pointer-events-none h-10 gap-2">
          <p className="text-foreground-500">Signed in as {username}</p>
        </DropdownItem>
        <DropdownItem key="dashboard" onPress={() => router.push("/dashboard")}>
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="signout"
          className="text-danger"
          color="danger"
          onPress={() => signOut()}
        >
          Signout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
