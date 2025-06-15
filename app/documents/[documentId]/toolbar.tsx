"use client";

import useEditorStore from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  FileJsonIcon,
  GlobeIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  KeyboardIcon,
  LinkIcon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageCirclePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SaveIcon,
  SearchIcon,
  SpellCheckIcon,
  StrikethroughIcon,
  TextIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";

import { CirclePicker, type ColorResult, SketchPicker } from "react-color";

import { Level } from "@tiptap/extension-heading";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { BsFilePdf } from "react-icons/bs";
import useEditorSave from "@/hooks/useEditorSave";

interface ToolbarProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label?: string;
}

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    {
      label: "Default",
      value: "normal",
    },
    {
      label: "Single",
      value: "1",
    },
    {
      label: "1.15",
      value: "1.15",
    },
    {
      label: "1.5",
      value: "1.5",
    },
    {
      label: "Double",
      value: "2",
    },
  ];
  return (
    <DropdownMenu>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              className={
                "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80"
              }
            >
              <ListCollapseIcon className={"size-4"} />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Line Height</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        {lineHeights.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph")?.lineHeight === value && "bg-neutral-200/80"
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle")?.fontSize
    ? editor?.getAttributes("textStyle")?.fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(currentFontSize);
  const [isEditing, setIsEditing] = useState(false);

  const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 30, 36, 48, 60, 72, 96];

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const incrementFontSize = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrementFontSize = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      // 确保字体大小不会小于等于0
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrementFontSize}
        className="text-sm h-7 min-w-7 p-1.5 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 transition-colors"
        title="减小字号"
      >
        <MinusIcon className="size-3.5" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            {isEditing ? (
              <input
                type="text"
                className="h-7 w-12 text-sm rounded-l-sm border text-center border-neutral-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setInputValue(currentFontSize);
                }}
                className="h-7 w-12 text-sm rounded-l-sm border border-r-0 text-center border-neutral-400 hover:bg-neutral-50 cursor-text focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
                title="点击输入字号"
              >
                {currentFontSize}
              </button>
            )}
            <button className="h-7 w-5 border border-l-0 border-neutral-400 rounded-r-sm hover:bg-neutral-50 flex items-center justify-center transition-colors">
              <ChevronDownIcon className="size-3" />
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[80px] max-h-60 overflow-y-auto">
          {fontSizes.map((size) => (
            <DropdownMenuItem
              key={size}
              onClick={() => updateFontSize(size.toString())}
              className={cn(
                "cursor-pointer text-center justify-center",
                parseInt(currentFontSize) === size && "bg-neutral-200/80 font-semibold"
              )}
            >
              {size}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        onClick={incrementFontSize}
        className="text-sm h-7 min-w-7 p-1.5 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 transition-colors"
        title="增大字号"
      >
        <PlusIcon className="size-3.5" />
      </button>
    </div>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <>
      {alignments.map(({ label, value, icon: Icon }) => (
        <ToolbarButton
          key={value}
          onClick={() => editor?.chain().focus().toggleTextAlign(value).run()}
          icon={Icon}
          isActive={editor?.isActive({ textAlign: value })}
          label={label}
        />
      ))}
    </>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onChange = (url: string) => {
    editor?.chain().focus().setImage({ src: url }).run();
    setImageUrl("");
  };

  const onUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const imgUrl = URL.createObjectURL(file);
        onChange(imgUrl);
      }
    };

    fileInput.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button className="text-sm h-7 min-w-7 p-2 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer">
                <ImageIcon className="size-4" />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Image Upload</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className={"size-4 mr-2"} />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className={"size-4 mr-2"} />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Insert Image URL</DialogTitle>

          <Input
            placeholder={"https://placehold.co/800x400"}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    if (href === "" || !/^https?:\/\/.+/.test(href)) {
      editor?.chain().focus().unsetLink().run();
    } else {
      editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setValue("");
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && setValue(editor?.getAttributes("link")?.href || "")}>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="text-sm h-7 min-w-7 p-2 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer">
              <LinkIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Link</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="p-2.5 flex justify-center gap-x-2">
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://example.com" />
        <Button variant="outline" onClick={() => onChange(value)}>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamily = () => {
  const { editor } = useEditorStore();

  const fontFamilies = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Maple Mono",
      value: "Maple Mono",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 w-[140px] shrink-0 p-2 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer">
          <span className="truncate">{editor?.getAttributes("textStyle")?.fontFamily || "Arial"}</span>
          <ChevronDownIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {fontFamilies.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(editor?.getAttributes("textStyle")?.fontFamily === value && "bg-neutral-200/80")}
          >
            <span style={{ fontFamily: value }}>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Heading = () => {
  const { editor } = useEditorStore();

  const headings: { label: string; value: 0 | Level }[] = [
    { label: "Normal Text", value: 0 },
    { label: "H1 Heading 1", value: 1 },
    { label: "H2 Heading 2", value: 2 },
    { label: "H3 Heading 3", value: 3 },
    { label: "H4 Heading 4", value: 4 },
    { label: "H5 Heading 5", value: 5 },
    { label: "H6 Heading 6", value: 6 },
  ];

  const getCurrentHeading = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor?.isActive("heading", { level: i })) {
        return `H${i} Heading ${i}`;
      }
    }
    return "Normal Text";
  };

  const handleHeadingClick = (value: 0 | Level) => {
    if (value === 0) {
      editor?.chain().focus().setParagraph().run();
    } else {
      editor?.chain().focus().toggleHeading({ level: value }).run();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 w-[140px] shrink-0 p-2 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {headings.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            className={cn(
              (editor?.isActive("heading", { level: value }) && "bg-neutral-200/80") ||
                (value === 0 && !editor?.isActive("heading") && "bg-neutral-200/80")
            )}
            onClick={() => handleHeadingClick(value)}
          >
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColor = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight")?.color || "";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 p-2 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 p-4">
        <CirclePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColor = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle")?.color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 p-2 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer">
          <span className="text-sm">A</span>
          <div className="w-full min-h-0.5" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ToolbarButton = ({ onClick, isActive, icon: Icon, label }: ToolbarProps) => {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer",
            isActive && "bg-neutral-200/80"
          )}
        >
          <Icon className={"size-4"} />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label ?? ""}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const SaveButton = () => {
  const { onSaveJSON, onSaveHTML, onSaveText } = useEditorSave();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 shrink-0 p-2 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer">
          <SaveIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onSaveJSON}>
          <FileJsonIcon className="size-4 mr-2" />
          Save as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSaveHTML}>
          <GlobeIcon className="size-4 mr-2" />
          Save as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.print()}>
          <BsFilePdf className="size-4 mr-2" />
          Save as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSaveText}>
          <TextIcon className="size-4 mr-2" />
          Save as Text
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 快捷键数据
  const shortcutSections = [
    {
      title: "基本操作",
      shortcuts: [
        { command: "复制", windows: "Ctrl + C", mac: "⌘ + C" },
        { command: "剪切", windows: "Ctrl + X", mac: "⌘ + X" },
        { command: "粘贴", windows: "Ctrl + V", mac: "⌘ + V" },
        { command: "无格式粘贴", windows: "Ctrl + Shift + V", mac: "⌘ + Shift + V" },
        { command: "撤销", windows: "Ctrl + Z", mac: "⌘ + Z" },
        { command: "重做", windows: "Ctrl + Shift + Z", mac: "⌘ + Shift + Z" },
        { command: "换行", windows: "Shift + Enter", mac: "Shift + Enter" },
        { command: "全选", windows: "Ctrl + A", mac: "⌘ + A" },
      ],
    },
    {
      title: "文本格式",
      shortcuts: [
        { command: "粗体", windows: "Ctrl + B", mac: "⌘ + B" },
        { command: "斜体", windows: "Ctrl + I", mac: "⌘ + I" },
        { command: "下划线", windows: "Ctrl + U", mac: "⌘ + U" },
        { command: "删除线", windows: "Ctrl + Shift + S", mac: "⌘ + Shift + S" },
        { command: "高亮", windows: "Ctrl + Shift + H", mac: "⌘ + Shift + H" },
        { command: "代码", windows: "Ctrl + E", mac: "⌘ + E" },
        { command: "下标", windows: "Ctrl + ,", mac: "⌘ + ," },
        { command: "上标", windows: "Ctrl + .", mac: "⌘ + ." },
      ],
    },
    {
      title: "段落格式",
      shortcuts: [
        { command: "普通文本", windows: "Ctrl + Alt + 0", mac: "⌘ + Alt + 0" },
        { command: "标题 1", windows: "Ctrl + Alt + 1", mac: "⌘ + Alt + 1" },
        { command: "标题 2", windows: "Ctrl + Alt + 2", mac: "⌘ + Alt + 2" },
        { command: "标题 3", windows: "Ctrl + Alt + 3", mac: "⌘ + Alt + 3" },
        { command: "标题 4", windows: "Ctrl + Alt + 4", mac: "⌘ + Alt + 4" },
        { command: "标题 5", windows: "Ctrl + Alt + 5", mac: "⌘ + Alt + 5" },
        { command: "标题 6", windows: "Ctrl + Alt + 6", mac: "⌘ + Alt + 6" },
        { command: "有序列表", windows: "Ctrl + Shift + 7", mac: "⌘ + Shift + 7" },
        { command: "无序列表", windows: "Ctrl + Shift + 8", mac: "⌘ + Shift + 8" },
        { command: "任务列表", windows: "Ctrl + Shift + 9", mac: "⌘ + Shift + 9" },
        { command: "引用", windows: "Ctrl + Shift + B", mac: "⌘ + Shift + B" },
        { command: "代码块", windows: "Ctrl + Alt + C", mac: "⌘ + Alt + C" },
      ],
    },
    {
      title: "文本对齐",
      shortcuts: [
        { command: "左对齐", windows: "Ctrl + Shift + L", mac: "⌘ + Shift + L" },
        { command: "居中对齐", windows: "Ctrl + Shift + E", mac: "⌘ + Shift + E" },
        { command: "右对齐", windows: "Ctrl + Shift + R", mac: "⌘ + Shift + R" },
        { command: "两端对齐", windows: "Ctrl + Shift + J", mac: "⌘ + Shift + J" },
      ],
    },
    {
      title: "文本选择",
      shortcuts: [
        { command: "向左扩展选择", windows: "Shift + ←", mac: "Shift + ←" },
        { command: "向右扩展选择", windows: "Shift + →", mac: "Shift + →" },
        { command: "向上扩展选择", windows: "Shift + ↑", mac: "Shift + ↑" },
        { command: "向下扩展选择", windows: "Shift + ↓", mac: "Shift + ↓" },
      ],
    },
  ];

  // 检测操作系统
  const isMac = typeof navigator !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <button className="text-sm h-7 min-w-7 p-2 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer">
              <KeyboardIcon className="size-4" />
            </button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>键盘快捷键</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <div className="p-6">
          <DialogTitle className="flex items-center gap-2 mb-6 text-xl font-semibold">
            <KeyboardIcon className="size-6" />
            键盘快捷键
          </DialogTitle>

          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-6">
              {shortcutSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h4 className="font-medium text-base text-gray-800 mb-3 pb-1 border-b border-gray-200">
                    {section.title}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {section.shortcuts.map((shortcut, shortcutIndex) => (
                      <div
                        key={shortcutIndex}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm text-gray-800 font-medium">{shortcut.command}</span>
                        <kbd className="px-3 py-1.5 text-xs font-mono bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                          {isMac ? shortcut.mac : shortcut.windows}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <p className="flex items-center gap-2">
              <span>💡</span>
              <span>
                这些快捷键基于{" "}
                <a
                  href="https://tiptap.dev/docs/editor/core-concepts/keyboard-shortcuts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Tiptap 官方文档
                </a>
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function Toolbar() {
  const { editor } = useEditorStore();
  const sections: { label: string; icon: LucideIcon; onClick?: () => void; isActive?: boolean }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
      {
        label: "Strike",
        icon: StrikethroughIcon,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageCirclePlusIcon,
        onClick: () => {},
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "List Numbered",
        icon: ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
      },
      {
        label: "List Bullet",
        icon: ListIcon,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
      },
      {
        label: "Remove Format",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className={"w-full bg-[#f1f4f9] px-2 rounded-md min-h-[40px] flex items-center gap-x-1 overflow-x-auto"}>
      <div className={"flex items-center gap-2 text-sm h-7 min-w-7"}>
        <Image src={"/logo.svg"} alt={"logo"} width={20} height={20} />
      </div>
      <Separator orientation="vertical" className="min-h-6 bg-neutral-300" />
      <SaveButton />
      <Separator orientation="vertical" className="min-h-6 bg-neutral-300" />
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="min-h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <LineHeightButton />
      <TextColor />
      <HighlightColor />
      <Separator orientation="vertical" className="min-h-6 bg-neutral-300" />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <LinkButton />
      <ImageButton />
      <Separator orientation="vertical" className="min-h-6 bg-neutral-300" />
      <FontFamily />
      <Separator orientation="vertical" className="min-h-6 bg-neutral-300" />
      <Heading />
      <Separator orientation="vertical" className="min-h-6 bg-neutral-300" />
      <AlignButton />
      <Separator orientation="vertical" className="min-h-6 bg-neutral-300" />
      <FontSizeButton />
      <Separator orientation="vertical" className="min-h-6 bg-neutral-300" />
      <KeyboardShortcuts />
    </div>
  );
}

export default Toolbar;
