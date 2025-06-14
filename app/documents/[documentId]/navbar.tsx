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
  MenubarGroup,
  MenubarLabel,
  MenubarSeparator,
} from "@/components/ui/menubar";

function Navbar() {
  return (
    <nav className={"flex items-center justify-between px-4 py-2"}>
      <Link href={"/"} className={"flex items-center gap-2"}>
        <Image src={"/logo.svg"} alt={"logo"} width={36} height={36} />
        <span className={"text-sm font-medium"}>Ran Document</span>
      </Link>
      <div className={"flex flex-col"}>
        <DocumentInput />
      </div>
    </nav>
  );
}

export default Navbar;
