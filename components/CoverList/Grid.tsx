import { CoverCard } from "@components/CoverCard";
import { classNames } from "@utils/functions";
import { FC } from "react";

interface GridProps {
  covers: any[];
  className?: string;
}

export const Grid: FC<GridProps> = ({ covers, className }) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        className
      )}
    >
      {covers.map((c, idx) => (
        <CoverCard details={c} key={idx} />
      ))}
    </div>
  );
};
