import { classNames } from "@utils/functions";
import { FC, Fragment } from "react";

interface VerticalTimelineProps {
  className?: string;
  items: { name: string; innerLabel: string; periodInfo?: string }[];
}

export const VerticalTimeline: FC<VerticalTimelineProps> = ({
  className = "",
  items,
}) => {
  return (
    <div className={classNames("flex items-center justify-between", className)}>
      {items.map(({ name, innerLabel, periodInfo }, idx) => (
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
            <span className="absolute w-full text-sm text-center top-21 font-poppins text-text-prim">
              {name}
            </span>
          </div>

          {idx !== items.length - 1 && (
            <div className="flex-grow h-1 bg-text-prim relative">
              <span className="absolute w-full text-center transform -translate-y-6 text-sm font-poppins text-blue-700 hidden sm:block">
                {periodInfo ?? ""}
              </span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
