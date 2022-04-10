import { classNames } from "@utils/functions";
import { FC, MouseEventHandler } from "react";

interface ApproveButtonProps {
  text: string;
  className?: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const RegularButton: FC<ApproveButtonProps> = ({
  text,
  onClick = () => {},
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      className={classNames(
        "bg-text-prim rounded-lg text-white px-btn-x py-btn-y font-poppins font-semibold uppercase",
        disabled && "opacity-75 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};
