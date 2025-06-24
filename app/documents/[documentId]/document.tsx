"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { Editor } from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";

import Toolbar from "./toolbar";

import { api } from "@/convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.document.getById>;
}

export function Document({ preloadedDocument }: DocumentProps) {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className={"min-h-screen bg-[#fafbfd] "}>
        <div className={"flex flex-col gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden"}>
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className={"pt-[160px] print:pt-0"}>
          <Editor />
        </div>
      </div>
    </Room>
  );
}
