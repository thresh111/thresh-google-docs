"use client";

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullscreenLoading from "@/components/fullscreen-loading";
import { getUsers } from "./action";
import { toast } from "sonner";

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

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    },
    []
  );

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      throttle={16}
      resolveUsers={({ userIds }) => userIds.map((userId) => users.find((user) => user.id === userId) ?? undefined)}
      resolveMentionSuggestions={({ text }) => {
        let filterUsers = users;
        if (text) {
          filterUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
        }
        return filterUsers.map((user) => user.id);
      }}
    >
      <RoomProvider id={documentId as string}>
        <ClientSideSuspense fallback={<FullscreenLoading label={"Loading room..."} />}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
