"use client";

import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./document-input";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarSeparator,
  MenubarMenu,
  MenubarSub,
  MenubarShortcut,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormatting,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import useEditorStore from "@/store/use-editor-store";
import useEditorSave from "@/hooks/useEditorSave";
import Avatars from "./avatars";
import { Inbox } from "./inbox";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Editor } from "@tiptap/react";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

import RemoveDialog from "@/components/remove-dialog";
import RenameDialog from "@/components/rename-dialog";

// 类型定义
interface MenuTrigger {
  icon?: LucideIcon | IconType;
  label: string;
}

interface BaseMenuItem {
  icon?: LucideIcon | IconType;
  label: string;
  shortcut?: string;
  onClick?: (editor?: Editor) => void;
}

interface SeparatorMenuItem {
  type: "separator";
}

interface RemoveMenuItem {
  type: "remove";
  icon?: LucideIcon | IconType;
  label: string;
}

interface RenameMenuItem {
  type: "rename";
  icon?: LucideIcon | IconType;
  label: string;
}

interface SubMenuItem {
  type: "sub";
  trigger: MenuTrigger;
  items: BaseMenuItem[];
  onClick?: () => void;
}

type MenuItem = BaseMenuItem | SeparatorMenuItem | RemoveMenuItem | RenameMenuItem | SubMenuItem;

interface MenuConfig {
  trigger: string;
  items: MenuItem[];
}

// 菜单数据配置

function Navbar({ data }: { data: Doc<"documents"> }) {
  const router = useRouter();
  const { editor } = useEditorStore();
  const { onSaveJSON, onSaveHTML, onSaveText } = useEditorSave();
  const mutation = useMutation(api.document.create);

  const onNewDocument = () => {
    mutation({ title: "Untitled Document", content: "" })
      .then((id) => {
        toast.success("Document created");
        router.push(`/documents/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create document");
      });
  };

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
  };

  const menuConfig: MenuConfig[] = [
    {
      trigger: "File",
      items: [
        {
          type: "sub",
          trigger: { icon: FileIcon, label: "Save" },
          items: [
            { icon: FileJsonIcon, label: "JSON", onClick: () => onSaveJSON(data) },
            { icon: GlobeIcon, label: "HTML", onClick: () => onSaveHTML(data) },
            { icon: BsFilePdf, label: "PDF", onClick: () => window.print() },
            { icon: FileTextIcon, label: "Text", onClick: () => onSaveText(data) },
          ],
        },
        { icon: FilePlusIcon, label: "New Document", onClick: () => onNewDocument() },
        { type: "separator" },
        { icon: FilePenIcon, label: "Rename", type: "rename" },
        { icon: TrashIcon, label: "Remove", type: "remove" },
        { type: "separator" },
        {
          icon: PrinterIcon,
          label: "Print",
          shortcut: "⌘P",
          onClick: () => window.print(),
        },
      ],
    },
    {
      trigger: "Edit",
      items: [
        {
          icon: Undo2Icon,
          label: "Undo",
          shortcut: "⌘Z",
          onClick: (editor?: Editor) => editor?.chain().focus().undo().run(),
        },
        {
          icon: Redo2Icon,
          label: "Redo",
          shortcut: "⌘Y",
          onClick: (editor?: Editor) => editor?.chain().focus().redo().run(),
        },
      ],
    },
    {
      trigger: "Insert",
      items: [
        {
          type: "sub",
          trigger: { label: "Table" },
          items: [
            { label: "1 x 1", onClick: () => insertTable({ rows: 1, cols: 1 }) },
            { label: "2 x 2", onClick: () => insertTable({ rows: 2, cols: 2 }) },
            { label: "3 x 3", onClick: () => insertTable({ rows: 3, cols: 3 }) },
            { label: "4 x 4", onClick: () => insertTable({ rows: 4, cols: 4 }) },
            { label: "Custom", onClick: () => insertTable({ rows: 0, cols: 0 }) },
          ],
        },
      ],
    },
    {
      trigger: "Format",
      items: [
        {
          type: "sub",
          trigger: { icon: TextIcon, label: "Text" },
          items: [
            {
              icon: BoldIcon,
              label: "Bold",
              shortcut: "⌘B",
              onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
              icon: ItalicIcon,
              label: "Italic",
              shortcut: "⌘I",
              onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
              icon: UnderlineIcon,
              label: "Underline",
              shortcut: "⌘U",
              onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
            {
              icon: StrikethroughIcon,
              label: "Strikethrough",
              shortcut: "⌘S",
              onClick: () => editor?.chain().focus().toggleStrike().run(),
            },
          ],
        },
        {
          icon: RemoveFormatting,
          label: "Clear Formatting",
          onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        },
      ],
    },
  ];

  // 渲染菜单项
  const renderMenuItem = (item: MenuItem, index: number) => {
    if ("type" in item && item.type === "remove") {
      return (
        <RemoveDialog documentId={data._id} key={index}>
          <MenubarItem className="cursor-pointer text-sm" onSelect={(e) => e.preventDefault()}>
            {item.icon && <item.icon className="size-4 mr-2" />}
            {item.label}
          </MenubarItem>
        </RemoveDialog>
      );
    }

    if ("type" in item && item.type === "rename") {
      return (
        <RenameDialog documentId={data._id} initialTitle={data.title} key={index}>
          <MenubarItem className="cursor-pointer text-sm" onSelect={(e) => e.preventDefault()}>
            {item.icon && <item.icon className="size-4 mr-2" />}
            {item.label}
          </MenubarItem>
        </RenameDialog>
      );
    }

    if ("type" in item && item.type === "separator") {
      return <MenubarSeparator key={index} />;
    }

    if ("type" in item && item.type === "sub") {
      return (
        <MenubarSub key={index}>
          <MenubarSubTrigger onClick={() => item.onClick?.()}>
            {item.trigger.icon && <item.trigger.icon className="size-4 mr-2" />}
            {item.trigger.label}
          </MenubarSubTrigger>
          <MenubarSubContent>
            {item.items.map((subItem: BaseMenuItem, subIndex: number) => (
              <MenubarItem key={subIndex} onClick={() => subItem.onClick?.()}>
                {subItem.icon && <subItem.icon className="size-4 mr-2" />}
                {subItem.label}
              </MenubarItem>
            ))}
          </MenubarSubContent>
        </MenubarSub>
      );
    }

    return (
      <MenubarItem key={index} className="cursor-pointer text-sm" onClick={() => item.onClick?.(editor || undefined)}>
        {item.icon && <item.icon className="size-4 mr-2" />}
        {item.label}
        {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
      </MenubarItem>
    );
  };

  return (
    <nav className="flex items-start justify-between px-4 py-4 bg-white border-b">
      <div className="flex items-start gap-3">
        <Link href="/" className=" hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col gap-1">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex items-center">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              {menuConfig.map((menu, menuIndex) => (
                <MenubarMenu key={menuIndex}>
                  <MenubarTrigger className="text-sm font-normal px-2 py-1 hover:bg-gray-100 rounded-sm transition-colors h-7">
                    {menu.trigger}
                  </MenubarTrigger>
                  <MenubarContent className="min-w-[160px] print:hidden">
                    {menu.items.map((item, itemIndex) => renderMenuItem(item, itemIndex))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* 这里可以添加分享按钮、用户头像等 */}
        <Inbox />
        <Avatars />
      </div>
    </nav>
  );
}

export default Navbar;
