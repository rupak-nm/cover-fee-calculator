import { Listbox } from "@headlessui/react";
import { FC } from "react";
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
  const handleChange = (val: string) => {
    // const _val = e.target.value;
    onChange(val);
  };

  return (
    <div className={`flex flex-col font-poppins ${className}`}>
      <label className="text-xs font-semibold tracking-wider uppercase text-text-gray">
        {label}
      </label>
      <Listbox
        as={"div"}
        value={selected}
        onChange={handleChange}
        {...selectProps}
        className="relative"
      >
        <Listbox.Button
          className={`p-4 pr-7 mt-2 w-full ${
            selected === "" ? "text-text-gray" : "text-black"
          } bg-white border rounded-lg outline-none ring-0 focus:ring-3/2 ring-prim-border focus:shadow-input border-border-gray text-left ${
            styles.select
          }`}
        >
          {options.find((opt) => opt.value === selected)?.name}
        </Listbox.Button>
        <Listbox.Options
          className={
            "absolute w-full bottom-15 bg-white border border-border-gray rounded-lg overflow-hidden focus:shadow-input focus:outline-none"
          }
        >
          {options.map(({ name, value }, idx) => (
            <Listbox.Option
              value={value}
              key={idx}
              className={`px-4 py-3 cursor-default ${
                selected === value
                  ? "bg-gray-200"
                  : "bg-white hover:bg-gray-100"
              } text-neutral-700`}
            >
              {name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Select;
