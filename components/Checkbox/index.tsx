import { classNames } from "@utils/functions";
import { FC, ReactChild } from "react";
import styles from "./styles.module.css";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => any;
  label?: ReactChild | string;
  custom?: boolean;
  labelClass?: string;
  size?: "sm" | "lg" | "xl";
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label = "",
  custom = false,
  labelClass = "",
  size = "sm",
}) => {
  return (
    <div className="relative flex items-center">
      <input
        data-size={size}
        type="checkbox"
        id={id ?? "checkbox-1"}
        className={classNames(
          "outline-none focus:ring-2",
          custom ? styles.custom_input : "origin-left",
          !custom
            ? size === "sm"
              ? "h-4 w-4"
              : size === "lg"
              ? "h-5 w-5"
              : "h-6 w-6"
            : ""
        )}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label && (
        <label
          className={classNames("ml-2 font-poppins", labelClass)}
          htmlFor={id ?? "checkbox-1"}
        >
          {label}
        </label>
      )}
    </div>
  );
};
