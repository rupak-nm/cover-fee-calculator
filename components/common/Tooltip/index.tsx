import { FC } from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface TooltipProps {
  text: string;
  position?: "bottom" | "left" | "right" | "top";
}

export const Tooltip: FC<TooltipProps> = ({
  text,
  children,
  position = "right",
}) => {
  return (
    <TooltipPrimitive.Root delayDuration={0}>
      <TooltipPrimitive.Trigger>
        <span className="sr-only">Tooltip Button</span>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content side={position}>
        <TooltipPrimitive.Arrow />
        <div className="px-4 py-3 text-xs font-light text-white rounded max-w-200px bg-prim-blue font-poppins">
          {text}
        </div>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
};
