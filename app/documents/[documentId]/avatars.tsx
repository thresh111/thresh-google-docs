"use client";

import { Separator } from "@/components/ui/separator";
import { ClientSideSuspense } from "@liveblocks/react";
import { useSelf, useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";

const AVATAR_SIZE = 36;

interface AvatarProps {
  src: string;
  name: string;
}

function Avatar({ name, src }: AvatarProps) {
  return (
    <div
      className={
        "group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
      }
    >
      <div
        className={
          "opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute top-full py-1 px-2 rounded-lg mt-2.5 text-xs bg-black whitespace-nowrap text-white"
        }
      >
        {name}
      </div>
      <Image src={src} alt={name} width={AVATAR_SIZE} height={AVATAR_SIZE} className={"size-full rounded-full"} />
    </div>
  );
}

function AvatarStack() {
  const users = useOthers();

  const currentUser = useSelf();

  if (users.length === 0)
    return (
      <div className={"relative ml-2"}>
        <Avatar name={"You"} src={currentUser.info.avatar} />
      </div>
    );

  return (
    <>
      <div className={"flex items-center "}>
        {currentUser && (
          <div className={"relative ml-2"}>
            <Avatar name={"You"} src={currentUser.info.avatar} />
          </div>
        )}
      </div>
      <div className={"flex items-center"}>
        {users.map(({ connectionId, info }) => (
          <Avatar key={connectionId} name={info.name} src={info.avatar} />
        ))}
      </div>
    </>
  );
}

export default function Avatars() {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
}
