import { CreateCoverForm } from "@components/CreateCoverForm";
import { FC } from "react";

export const CreateCover: FC = () => {
  return (
    <div className="grid grid-cols-12 px-4 bg-prim-gray sm:px-14 lg:px-28 pt-50px pb-150px">
      <div className="flex flex-col col-span-12 gap-6 lg:col-span-7">
        <h1 className="font-bold text-prim-blue text-heading">
          Create New Cover
        </h1>
        <CreateCoverForm />
      </div>
    </div>
  );
};
