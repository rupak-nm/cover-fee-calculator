import { CreateCoverForm } from "@components/CreateCoverForm";
import { LeftArrow } from "@svg";
import { FC } from "react";

interface CreateCoverProps {
  gotoHome: Function;
}

export const CreateCover: FC<CreateCoverProps> = ({ gotoHome }) => {
  const BackBtn = () => (
    <button
      className="flex items-center gap-2 p-2 border-2 rounded-lg text-text-prim border-text-prim"
      onClick={() => gotoHome()}
    >
      <LeftArrow className="" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
  return (
    <div className="grid grid-cols-12 px-4 bg-prim-gray sm:px-14 lg:px-28 pt-50px pb-150px">
      <div className="flex flex-col col-span-12 gap-6 lg:col-span-7">
        <div className="flex justify-between">
          <h1 className="font-bold text-prim-blue text-heading">
            Create New Cover
          </h1>
          <BackBtn />
        </div>
        <CreateCoverForm />
      </div>
    </div>
  );
};
