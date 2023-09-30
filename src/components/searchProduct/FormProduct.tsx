import React, { useState } from "react";
import Input from "@/components/base/Input";
import Button from "@/components/base/Button";
import { SearchNormal1 } from "iconsax-react";
import { useRouter } from "next/router";

type Props = {
  initialValue?: string;
  isLoading?: boolean;
  disabled?: boolean;
};

export default function FormProduct(props: Props) {
  const [search, setSearch] = useState<string>(props.initialValue || "");
  const route = useRouter();
  function searchProduct(e: React.FormEvent<HTMLFormElement>) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    e.preventDefault();
    route.push({
      query: {
        search,
      },
    });

    setSearch("");
  }
  return (
    <form className="grid grid-cols-4 mt-4 gap-3" onSubmit={searchProduct}>
      <div className="col-span-3">
        <Input
          disabled={props.disabled}
          append={<SearchNormal1 />}
          onChange={(e) => setSearch(e.target.value)}
          required
          value={search}
        />
      </div>
      <div className="col-span-1">
        <Button disabled={props.isLoading || props.disabled}>Cari</Button>
      </div>
    </form>
  );
}
