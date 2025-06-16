"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { ReactNode, useState } from "react";
import { DrawerTrigger } from "./ui/drawer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RenameDialogProps {
  documentId: Id<"documents">;
  children: ReactNode;
  initialTitle: string;
}

function RenameDialog({ documentId, children, initialTitle }: RenameDialogProps) {
  const updateDocument = useMutation(api.document.updateById);
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    updateDocument({ id: documentId, title: name.trim() || "Untitled" })
      .then(() => {
        setOpen(false);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename {initialTitle}</DialogTitle>
            <DialogDescription>Change the name of this document</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type={"button"} disabled={isUpdating}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Renaming..." : "Rename"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RenameDialog;
