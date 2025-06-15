import { LoaderIcon } from "lucide-react";

interface FullscreenLoadingProps {
  label?: string;
}

function FullscreenLoading({ label }: FullscreenLoadingProps) {
  return (
    <div className={"min-h-screen flex-col flex items-center justify-center gap-2"}>
      <LoaderIcon className={"size-12 text-muted-foreground animate-spin"} />
      {label && <p className={"text-lg text-muted-foreground"}>{label}</p>}
    </div>
  );
}

export default FullscreenLoading;
