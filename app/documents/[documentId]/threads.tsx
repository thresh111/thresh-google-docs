import { useThreads } from "@liveblocks/react/suspense";
import { AnchoredThreads, FloatingComposer, FloatingThreads } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";

export default function Threads({ editor }: { editor: Editor | null }) {
  const { threads } = useThreads({ query: { resolved: false } });

  return (
    <div className={"w-[300px] absolute right-4"}>
      <div className="anchored-threads">
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
      <FloatingThreads editor={editor} threads={threads} className="floating-threads" />
      <FloatingComposer editor={editor} className="floating-composer" />
    </div>
  );
}
