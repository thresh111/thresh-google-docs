"use client";

import { BellIcon } from "lucide-react";
import { ClientSideSuspense, useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Inbox() {
  return (
    <ClientSideSuspense
      fallback={
        <>
          <Button variant={"ghost"} size={"icon"} disabled className={"relative"}>
            <BellIcon className={"size-5"} />
          </Button>
          <Separator orientation={"vertical"} className={"min-h-6"} />
        </>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
}

function InboxMenu() {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className={"relative"}>
            <BellIcon className={"size-5"} />
            {inboxNotifications?.length > 0 && (
              <Badge
                variant={"outline"}
                className={
                  "absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center"
                }
              >
                {inboxNotifications.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {inboxNotifications?.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((notification) => (
                <InboxNotification key={notification.id} inboxNotification={notification} />
              ))}
            </InboxNotificationList>
          ) : (
            <div className={"p-2 w-[200px] text-center text-sm text-muted-foreground"}>No notifications</div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation={"vertical"} className={"min-h-6"} />
    </>
  );
}
