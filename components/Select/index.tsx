import { ChangeEvent, FC } from "react";
import styles from "./style.module.css";

type value = {
  name: string;
  value: string;
};

interface SelectProps {
  selected: string;
  onChange: (val: string) => any;
  options: value[];
  label: string;
  className?: string;
  selectProps?: Object;
}

const Select: FC<SelectProps> = ({
  selected,
  onChange,
  options,
  label,
  className,
  selectProps = {},
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const _val = e.target.value;
    onChange(_val);
  };

  return (
    <div className={`flex flex-col font-poppins ${className}`}>
      <label className="text-xs font-semibold uppercase text-text-gray">
        {label}
      </label>
      <select
        className={`p-4 pr-7 mt-2 ${
          selected === "" ? "text-text-gray" : "text-black"
        } bg-white border rounded-lg outline-none focus:ring-2 focus:ring-gray-500 border-border-gray ${
          styles.select
        }`}
        value={selected}
        onChange={handleChange}
        {...selectProps}
      >
        {options.map(({ name, value }, idx) => (
          <option
            value={value}
            key={idx}
            className={`p-4 ${
              selected === value ? "bg-gray-200" : "bg-white"
            } rounded-md text-neutral-700`}
          >
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
