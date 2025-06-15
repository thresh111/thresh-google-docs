import Link from "next/link";
import Image from "next/image";
import SearchInput from "./search-input";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <nav className={"flex items-center justify-between h-full w-full"}>
      <div className={"flex gap-3 items-center shrink-0 pr-6"}>
        <Link href={"/"}>
          <Image src={"/logo.svg"} width={36} height={36} alt={"logo"} />
        </Link>
        <h3 className={"text-xl font-medium"}>Thresh Docs</h3>
      </div>
      <SearchInput />
      <div>
        <UserButton />
      </div>
    </nav>
  );
}

export default Navbar;
