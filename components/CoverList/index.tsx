import { PlusIcon } from "@svg";
import Link from "next/link";
import { FC } from "react";
import { Grid } from "./Grid";

interface CoverListProps {
  covers: any[];
}

export const CoverList: FC<CoverListProps> = ({ covers }) => {
  const CreateBtn = () => (
    <Link href={"/create"} passHref>
      <a>
        <button className="flex items-center gap-2 px-2 py-1 border rounded-lg text-text-prim border-text-prim">
          <PlusIcon className="" />
          <span className="text-sm font-medium">Create a New Cover</span>
        </button>
      </a>
    </Link>
  );

  return (
    <div className="justify-between min-h-screen px-4 bg-prim-gray py-18 sm:px-14 lg:px-28">
      <div className="flex flex-wrap-reverse items-center justify-between gap-2">
        <h1 className="font-bold text-prim-blue text-heading">
          Available Covers
        </h1>
        <CreateBtn />
      </div>
      <Grid covers={covers} className="mt-18" />
    </div>
  );
};
