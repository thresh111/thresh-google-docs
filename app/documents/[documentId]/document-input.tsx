"use client";

import React, { useRef, useState } from "react";

import { Id } from "@/convex/_generated/dataModel";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import useDebounce from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

function DocumentInput({ title, id }: DocumentInputProps) {
  const status = useStatus();

  const [value, setValue] = useState(title);

  const [isEditing, setIsEditing] = useState(false);

  const [isPending, setPending] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const showLoader = isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  const mutate = useMutation(api.document.updateById);

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setPending(true);
    mutate({ id, title: newValue })
      .then(() => {
        toast.success("Document title updated");
      })
      .catch(() => {
        toast.error("Failed to update document title");
      })
      .finally(() => {
        setPending(false);
      });
  }, 1000);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === title) return;
    setPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast.success("Document title updated");
        setIsEditing(false);
      })
      .catch(() => {
        toast.error("Failed to update document title");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className={"flex items-center gap-2 relative"}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <span className={"invisible whitespace-pre px-1.5  max-w-[50ch] text-lg"}>{value || ""}</span>
          <input
            type="text"
            ref={inputRef}
            className={"absolute truncate bg-transparent text-lg text-black inset-0 px-1.5"}
            value={value}
            onChange={onChange}
          />
        </form>
      ) : (
        <span
          className={"text-lg px-1.5 cursor-pointer truncate"}
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          onBlur={() => {
            setIsEditing(false);
            debounceUpdate(value);
          }}
        >
          {title}
        </span>
      )}
      {!showLoader && !showError && <BsCloudCheck />}
      {showLoader && <LoaderIcon className={"size-4 animate-spin text-muted-foreground"} />}
      {showError && <BsCloudSlash className={"size-4 text-red-500"} />}
    </div>
  );
}

export default DocumentInput;
