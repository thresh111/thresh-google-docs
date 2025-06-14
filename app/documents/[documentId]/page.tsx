import { Editor } from "./editor";
import Navbar from "./navbar";
import Toolbar from "./toolbar";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = await params;

  return (
    <div className={"min-h-screen bg-[#fafbfd] "}>
      <Navbar />
      <Toolbar />
      <Editor />
    </div>
  );
}

export default DocumentIdPage;
