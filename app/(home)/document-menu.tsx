import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { ExternalLinkIcon, FilePenIcon, MoreVerticalIcon, ShareIcon, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RemoveDialog from "@/components/remove-dialog";
import RenameDialog from "@/components/rename-dialog";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

function DocumentMenu({ documentId, onNewTab, title }: DocumentMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className={"rounded-full"} onClick={(e) => e.stopPropagation()}>
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onNewTab(documentId);
          }}
        >
          <ExternalLinkIcon className={"size-4 mr-2"} />
          <span className="text-xs">Open in a new tab</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShareIcon className={"size-4 mr-2"} />
          <span className="text-xs">Share</span>
        </DropdownMenuItem>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <FilePenIcon className={"size-4 mr-2"} />
            <span className="text-xs">Rename</span>
          </DropdownMenuItem>
        </RenameDialog>

        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <TrashIcon className={"size-4 mr-2 text-red-500"} />
            <span className={"text-red-500 text-xs"}>Delete</span>
          </DropdownMenuItem>
        </RemoveDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DocumentMenu;
