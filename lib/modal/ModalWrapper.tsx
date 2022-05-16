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
        "border z-50 border-[#B0C4DB] bg-white relative inline-block max-w-3xl p-12 text-left align-middle min-w-300 lg:min-w-600 sm:w-auto bg-prim-gray rounded-3xl",
        className
      )}
    >
      {children}
    </div>
  );
};
