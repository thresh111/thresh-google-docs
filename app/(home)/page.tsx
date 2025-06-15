"use client";

import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import DocumentsTable from "./documents-table";

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.document.get,
    {},
    {
      initialNumItems: 5,
    }
  );

  return (
    <div className={"flex flex-col min-h-screen"}>
      <div className={"fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4"}>
        <Navbar />
      </div>

      <div className={"mt-16"}>
        <TemplatesGallery />
        <DocumentsTable documents={results} status={status} loadMore={loadMore} />
      </div>
    </div>
  );
}
