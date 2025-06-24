import { Doc } from "@/convex/_generated/dataModel";
import useEditorStore from "@/store/use-editor-store";

function useEditorSave() {
  const { editor } = useEditorStore();

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = (data: Doc<"documents">) => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    onDownload(blob, `${data.title}.json`);
  };

  const onSaveHTML = async (data: Doc<"documents">) => {
    if (!editor) return;

    try {
      // 获取模板文件
      const response = await fetch("/document-template.html");
      const template = await response.text();

      // 获取文档内容
      const content = editor.getHTML();

      // 替换模板中的占位符
      const fullHTML = template
        .replace(/\{\{DOCUMENT_TITLE\}\}/g, data.title)
        .replace(/\{\{DOCUMENT_CONTENT\}\}/g, content)
        .replace(/\{\{EXPORT_DATE\}\}/g, new Date().toLocaleString("zh-CN"));

      const blob = new Blob([fullHTML], { type: "text/html" });
      onDownload(blob, `${data.title}.html`);
    } catch (error) {
      console.error("导出HTML失败:", error);
      const content = editor.getHTML();
      const blob = new Blob([content], { type: "text/html" });
      onDownload(blob, `${data.title}.html`);
    }
  };

  const onSaveText = (data: Doc<"documents">) => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload(blob, `${data.title}.txt`);
  };

  return {
    onSaveJSON,
    onSaveHTML,
    onSaveText,
  };
}

export default useEditorSave;
