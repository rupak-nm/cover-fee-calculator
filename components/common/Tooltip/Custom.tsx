import { classNames } from "@utils/functions";
import { FC } from "react";

import styles from "./styles.module.css";

interface TooltipProps {
  text: string;
  className?: string;
}

export const CustomTooltip: FC<TooltipProps> = ({
  children,
  text,
  className = "",
}) => {
  return (
    <div className="relative">
      <div className="peer">{children}</div>
      <div
        className={classNames(
          "hidden peer-hover:block absolute bg-prim-blue text-white font-poppins text-xs font-light rounded py-3 px-4 min-w-200px inset-0 z-40 h-fit left-full top-full transform -translate-y-1/2 translate-x-2",
          className
        )}
      >
        {text}
      </div>
    </div>
  );
};
