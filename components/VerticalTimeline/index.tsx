import { classNames } from "@utils/functions";
import { FC, Fragment } from "react";

interface VerticalTimelineProps {
  className?: string;
  items: { name: string; innerLabel: string }[];
}

export const VerticalTimeline: FC<VerticalTimelineProps> = ({
  className = "",
  items,
}) => {
  return (
    <div className={classNames("flex items-center justify-between", className)}>
      {items.map(({ name, innerLabel }, idx) => (
        <Fragment key={idx}>
          <div className="relative">
            <div
              className={classNames(
                "flex items-center justify-center border-4 border-text-prim rounded-full w-75px h-75px",
                idx === 0
                  ? "text-text-prim bg-transparent"
                  : idx === items.length - 1
                  ? "bg-text-prim text-white"
                  : "bg-light-blue text-white"
              )}
            >
              <span className="text-sm font-poppins">{innerLabel}</span>
            </div>
            <span className="absolute w-full text-sm text-center -bottom-8 font-poppins text-text-prim">
              {name}
            </span>
          </div>

          {idx !== items.length - 1 && (
            <div className="flex-grow h-1 bg-text-prim"></div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
