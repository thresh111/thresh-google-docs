"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import useSearchParam from "@/hooks/useSearchParam";

function SearchInput() {
  const [search, setSearch] = useSearchParam("search");

  const [value, setValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  return (
    <div className={"flex-1 items-center justify-center flex"}>
      <form className={"relative max-w-[720px] w-full"} onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder={"Search"}
          className={
            "md:text-base placeholder:text-neutral-400 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_1px_rgba(65,69,73,0.15)] bg-[#f0f4f8] rounded-lg h-[48px] focus-visible:ring-0 focus-visible:bg-white"
          }
        />
        <Button
          type={"submit"}
          variant={"ghost"}
          size={"icon"}
          className={"absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5"}
        >
          <Search />
        </Button>

        {value && (
          <Button
            type={"button"}
            variant={"ghost"}
            size={"icon"}
            className={"absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5"}
            onClick={handleClear}
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
}

export default SearchInput;
