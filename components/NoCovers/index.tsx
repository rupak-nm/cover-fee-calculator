import { RegularButton } from "@components/RegularButton";
import { ClipboardImage } from "@svg";
import Link from "next/link";
import { FC } from "react";

interface NoCoversProps {}

export const NoCovers: FC<NoCoversProps> = ({}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-prim-gray">
      <div className="flex flex-col items-center gap-y-8">
        <ClipboardImage width="209" height="209" />
        <p className="font-poppins text-404040">
          There are currently no covers to show.
        </p>
        <Link href={"/create"} passHref>
          <a>
            <RegularButton
              text="Create a New Cover"
              className="px-4 py-3 text-sm font-medium tracking-normal"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};
