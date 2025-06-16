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
      <div className={"flex flex-col gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden"}>
        <Navbar />
        <Toolbar />
      </div>
      <div className={"pt-[180px] print:pt-0"}>
        <Editor />
      </div>
    </div>
  );
}

export default DocumentIdPage;
