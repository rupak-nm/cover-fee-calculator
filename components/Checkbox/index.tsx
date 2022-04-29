import { classNames } from "@utils/functions";
import { FC, ReactChild } from "react";
import styles from "./styles.module.css";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => any;
  label?: ReactChild | string;
  custom?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label = "",
  custom = false,
}) => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        id={id ?? "checkbox-1"}
        className={classNames(
          "outline-none focus:ring-2",
          custom ? styles.custom_input : "origin-left transform scale-125"
        )}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label && (
        <label className="ml-2 font-poppins" htmlFor={id ?? "checkbox-1"}>
          {label}
        </label>
      )}
    </div>
  );
};
