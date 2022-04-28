import { RegularButton } from "@components/RegularButton";
import { ClipboardImage } from "@svg";
import { FC } from "react";

interface NoCoversProps {
  gotoCreateCover: Function;
}

export const NoCovers: FC<NoCoversProps> = ({ gotoCreateCover }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-prim-gray">
      <div className="flex flex-col items-center gap-y-8">
        <ClipboardImage width="209" height="209" />
        <p className="font-poppins">There are currently no covers to show.</p>
        <RegularButton
          text="Create a New Cover"
          className="px-4 py-3 text-sm font-medium"
          onClick={() => gotoCreateCover()}
        />
      </div>
    </div>
  );
};
