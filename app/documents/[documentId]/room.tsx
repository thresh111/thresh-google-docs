"use client";

import { ReactNode } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
  const { documentId } = useParams();
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_nrPbway3WX3AZeZtaFGFRgR8Ardn2YRnSrRX5P0iWlNb_vP9x72taWrBdjPIs5yb"}>
      <RoomProvider id={documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
