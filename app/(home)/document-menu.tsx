import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { ExternalLinkIcon, FileIcon, MoreVerticalIcon, PencilIcon, ShareIcon, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RemoveDialog from "@/components/remove-dialog";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

function DocumentMenu({ documentId, onNewTab, title }: DocumentMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className={"rounded-full"}>
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className={"size-4 mr-2"} />
          <span>Open in a new tab</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShareIcon className={"size-4 mr-2"} />
          <span>Share</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <PencilIcon className={"size-4 mr-2"} />
          <span>Rename</span>
        </DropdownMenuItem>

        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <TrashIcon className={"size-4 mr-2 text-red-500"} />
            <span className={"text-red-500"}>Delete</span>
          </DropdownMenuItem>
        </RemoveDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DocumentMenu;
