import { PlusIcon } from "@svg";
import { FC } from "react";
import { Grid } from "./Grid";

interface CoverListProps {
  covers: any[];
  gotoCreateCover: Function;
}

export const CoverList: FC<CoverListProps> = ({ covers, gotoCreateCover }) => {
  const CreateBtn = () => (
    <button
      className="flex items-center gap-2 px-2 py-1 border-2 rounded-lg text-text-prim border-text-prim"
      onClick={() => gotoCreateCover()}
    >
      <PlusIcon className="" />
      <span className="text-sm font-medium">Create a New Cover</span>
    </button>
  );

  return (
    <div className="justify-between min-h-screen px-4 bg-prim-gray py-18 sm:px-14 lg:px-28">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-prim-blue text-heading">
          Available Covers
        </h1>
        <CreateBtn />
      </div>
      <Grid covers={covers} className="mt-18" />
    </div>
  );
};
