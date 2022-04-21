import { FC, ReactChild } from "react";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => any;
  label: ReactChild | string;
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
}) => {
  return (
    <div>
      <input
        type={"checkbox"}
        className="transform origin-left scale-125 outline-none focus:ring-2"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className="ml-2 font-poppins">
        {label}
      </label>
    </div>
  );
};
