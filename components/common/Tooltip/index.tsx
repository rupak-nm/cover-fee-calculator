import { FC } from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface TooltipProps {
  text: string;
}

export const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  return (
    <TooltipPrimitive.Root delayDuration={0}>
      <TooltipPrimitive.Trigger>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content side="right">
        <TooltipPrimitive.Arrow />
        <div className="px-4 py-3 text-xs font-light text-white rounded max-w-200px bg-prim-blue font-poppins">
          {text}
        </div>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
};
