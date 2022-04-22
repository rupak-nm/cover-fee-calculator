import { ChangeEventHandler, FC, ReactChild } from "react";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: ReactChild | string;
}

export const TableCheckBox: FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
}) => {
  return (
    <div >
      <input
        type={"checkbox"}
        className="transform scale-125"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor={id} className="ml-2 font-poppins">
        {label}
      </label>
    </div>
  );
};
