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
    <div className="w-full h-40 overflow-x-auto">
      <div
        className={classNames(
          "flex min-w-400px items-center justify-between",
          className
        )}
      >
        {items.map(({ name, innerLabel, periodInfo }, idx) => (
          <Fragment key={idx}>
            <div className="relative">
              <div
                className={classNames(
                  "flex items-center justify-center border-4 rounded-full w-75px h-75px",
                  idx === 0
                    ? "text-text-prim bg-transparent border-light-blue"
                    : idx === items.length - 1
                    ? "bg-text-prim text-white border-text-prim"
                    : "bg-light-blue text-white border-light-blue"
                )}
              >
                <span className="text-sm font-poppins">{innerLabel}</span>
              </div>
              <span className="absolute w-full text-sm text-center top-21 font-poppins text-text-prim">
                {name}
              </span>
            </div>

            {idx !== items.length - 1 && (
              <div className="relative flex-grow h-1 bg-light-blue">
                <span className="absolute w-full text-xs font-bold text-center transform -translate-y-6 -bottom-4 text-light-blue">
                  {periodInfo ?? ""}
                </span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
