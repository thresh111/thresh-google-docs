"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import useEditorStore from "@/store/use-editor-store";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";

import { LineHeightExtension } from "@/extensions/line-height";
import { FontSizeExtension } from "@/extensions/font-size";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";

import { useStorage } from "@liveblocks/react/suspense";
import { useEffect, useRef } from "react";

import Threads from "./threads";

import Ruler from "./ruler";

interface EditorProps {
  content?: string;
}

export function Editor({ content }: EditorProps) {
  const { setEditor } = useEditorStore();
  const contentSetRef = useRef(false);

  const liveblocks = useLiveblocksExtension({
    initialContent: content,
    offlineSupport_experimental: true,
  });

  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
      if (content && content.trim() !== "" && !contentSetRef.current) {
        setTimeout(() => {
          if (!contentSetRef.current) {
            editor.commands.setContent(content, false);
            contentSetRef.current = true;
          }
        }, 50);
      }
    },
    onDestroy() {
      setEditor(null);
      contentSetRef.current = false;
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left:${leftMargin ?? 56}px;padding-right:${rightMargin ?? 56}px`,
        class:
          "focus:outline-none print:border-0 bg-white  border-[#c7c7c7] border flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      Underline,
      TextStyle,
      FontFamily,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
    ],
    content,
  });

  useEffect(() => {
    if (editor && content && content.trim() !== "" && !contentSetRef.current) {
      const timer = setTimeout(() => {
        const currentContent = editor.getHTML();
        if (
          !contentSetRef.current &&
          (!currentContent ||
            currentContent === "<p></p>" ||
            currentContent.trim() === "" ||
            currentContent === '<p class="is-editor-empty"><br class="ProseMirror-trailingBreak"></p>')
        ) {
          editor.commands.setContent(content, false);
          contentSetRef.current = true;
          editor.commands.focus();
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [editor, content]);

  useEffect(() => {
    contentSetRef.current = false;
  }, [content]);

  return (
    <div className={"size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible"}>
      <div className={"min-w-full flex justify-center py-4 print:py-0 mx-auto print:w-full print:min-w-0"}>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
}
