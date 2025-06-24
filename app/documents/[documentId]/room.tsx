"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullscreenLoading from "@/components/fullscreen-loading";
import { getDocuments, getUsers } from "./action";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const { documentId } = useParams();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  }, []);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = documentId as string;
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });
        return await response.json();
      }}
      throttle={16}
      resolveUsers={({ userIds }) => userIds.map((userId) => users.find((user) => user.id === userId) ?? undefined)}
      resolveMentionSuggestions={({ text }) => {
        let filterUsers = users;
        if (text) {
          filterUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
        }
        return filterUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents;
      }}
    >
      <RoomProvider
        id={documentId as string}
        initialStorage={{ leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT }}
      >
        <ClientSideSuspense fallback={<FullscreenLoading label={"Loading room..."} />}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
