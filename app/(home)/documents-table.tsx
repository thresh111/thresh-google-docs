import { Doc } from "@/convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
  TableCaption,
} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import DocumentRow from "./document-row";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  status: PaginationStatus;
  loadMore: (numItems: number) => void;
}

function DocumentsTable({ status, documents, loadMore }: DocumentsTableProps) {
  return (
    <div className={"max-w-screen-xl mx-auto px-16 py-6 flex-col flex"}>
      {documents === undefined ? (
        <div className={"flex items-center justify-center h-24"}>
          <LoaderIcon className={"animate-spin text-muted-foreground size-5"} />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className={"hover:bg-transparent border-none"}>
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className={"hidden md:table-cell"}>Shared</TableHead>
              <TableHead className={"hidden md:table-cell"}>Created at</TableHead>
            </TableRow>
          </TableHeader>

          {documents.length === 0 ? (
            <TableBody>
              <TableRow className={"hover:bg-transparent border-none"}>
                <TableCell colSpan={4} className={"h-24 text-center text-muted-foreground"}>
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents?.map((document) => {
                return <DocumentRow key={document._id} document={document} />;
              })}
            </TableBody>
          )}
        </Table>
      )}

      <div className={"flex justify-center items-center"}>
        <Button variant={"ghost"} size={"sm"} onClick={() => loadMore(5)} disabled={status !== "CanLoadMore"}>
          {documents?.length !== 0 && (status === "CanLoadMore" ? "Load More" : "No more documents")}
        </Button>
      </div>
    </div>
  );
}

export default DocumentsTable;
