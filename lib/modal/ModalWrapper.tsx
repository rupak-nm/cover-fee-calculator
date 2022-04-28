import { classNames } from "@utils/functions";
import { ReactNode } from "react";

export const ModalWrapper = ({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={classNames(
        "border-[1.5px] border-[#B0C4DB] relative inline-block max-w-xl p-12 text-left align-middle min-w-300 lg:min-w-600 sm:w-auto bg-prim-gray rounded-3xl",
        className
      )}
    >
      {children}
    </div>
  );
};
