import { Doc, Id } from "@/convex/_generated/dataModel";
import { TableCell, TableRow } from "@/components/ui/table";

import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-react";

import { format } from "date-fns";

import DocumentMenu from "./document-menu";
import { useRouter } from "next/navigation";

interface DocumentsRowProps {
  document: Doc<"documents">;
}

function DocumentsRow({ document }: DocumentsRowProps) {
  const router = useRouter();

  const onNewTabClick = (id: Id<"documents">) => {
    window.open(`/documents/${id}`, "_blank");
  };

  const onRowClick = (id: Id<"documents">) => {
    router.push(`/documents/${id}`);
  };

  return (
    <TableRow className={"cursor-pointer"} onClick={() => onRowClick(document._id)}>
      <TableCell className={"w-[50px]"}>
        <SiGoogledocs className={"size-6 text-blue-500"} />
      </TableCell>
      <TableCell className={"font-medium md:w-[45%]"}>{document.title}</TableCell>
      <TableCell className={"text-muted-foreground hidden md:flex items-center gap-2"}>
        {document.organizationId ? <Building2Icon className={"size-4"} /> : <CircleUserIcon className={"size-4"} />}
        {document.organizationId ? "organization" : "personal"}
      </TableCell>
      <TableCell className={"text-muted-foreground hidden md:table-cell"}>
        {format(new Date(document.createdAt), "MMM dd, yyyy")}
      </TableCell>

      <TableCell className={"flex"}>
        <DocumentMenu documentId={document._id} title={document.title} onNewTab={onNewTabClick} />
      </TableCell>
    </TableRow>
  );
}

export default DocumentsRow;
