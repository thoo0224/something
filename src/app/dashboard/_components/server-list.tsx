"use client";

import { useOptimistic, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  cn,
  useDisclosure,
} from "@nextui-org/react";

import { BiSolidServer } from "react-icons/bi";

import { Server } from "@/lib/database/schemas/server";
import { useAction } from "next-safe-action/hook";

import { createServerAction, deleteServerAction } from "../actions";

type Props = {
  servers: Server[];
};

type AddOptimisticServer = {
  action: "add";
  name: string;
};

type RemoveOptimisticServer = {
  action: "remove";
  id: string;
};

type OptimisticServerAction = AddOptimisticServer | RemoveOptimisticServer;

export function ServerList({ servers }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");

  const [optimisticServers, updateOptimisticServers] = useOptimistic(
    servers,
    (state: Server[], action: OptimisticServerAction) => {
      if (action.action === "add")
        return [
          ...state,
          {
            id: "",
            name: action.name,
            owner: "",
          },
        ];

      if (action.action === "remove")
        return state.filter((x) => x.id !== action.id);

      return [];
    }
  );

  const { execute: createServer } = useAction(createServerAction);
  const { execute: deleteServer } = useAction(deleteServerAction);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <Input placeholder="Search..." maxLength={64} />
        <Button color="primary" onPress={onOpen}>
          Create
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Create Server</ModalHeader>
                <ModalBody>
                  <Input value={name} onValueChange={setName} label="Name" />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                      setName("");

                      updateOptimisticServers({
                        action: "add",
                        name: name,
                      });

                      createServer({
                        name,
                      });
                    }}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {optimisticServers?.map((server) => {
          const isOptimistic = server.id.length == 0;
          return (
            <div key={server.id} className="flex flex-col gap-1">
              <Link
                href={`/dashboard/${server.id}`}
                aria-disabled={isOptimistic}
                className={cn(isOptimistic && "pointer-events-none opacity-75")}
              >
                <Card className="w-full max-w-full hover:bg-content2">
                  <CardHeader className="flex justify-between gap-3">
                    <div className="rounded-lg bg-background p-3">
                      <BiSolidServer className="h-4 w-4" />
                    </div>

                    <p className="text-medium font-medium">{server.name}</p>
                  </CardHeader>
                </Card>
              </Link>
              <Button
                className="w-fit"
                color="danger"
                size="sm"
                onPress={() => {
                  updateOptimisticServers({
                    action: "remove",
                    id: server.id,
                  });

                  deleteServer({
                    id: server.id,
                  });
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
