import { FC } from "react";
import { getNumberSeparators } from "@utils/formatting";
import CurrencyInput from "react-currency-input-field";

interface InputFieldProps {
  label: string;
  value: string;
  setValue: (val: string) => any;
  id?: string;
  name?: string;
  prefix?: string;
  suffix?: string;
  placeholder: string;
  className?: string;
  inputProps?: Object;
  numberFormat?: boolean;
  allowNegative?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  value,
  setValue,
  id,
  name,
  label,
  placeholder,
  className = "",
  inputProps = {},
  prefix = "",
  suffix = "",
  numberFormat = true,
  allowNegative = false,
}) => {
  const { decimal, thousand } = getNumberSeparators();

  return (
    <div className={`flex flex-col font-poppins ${className}`}>
      <label className="text-xs font-semibold tracking-wider uppercase text-text-gray">
        {label}
      </label>
      <CurrencyInput
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={1000}
        decimalsLimit={2}
        prefix={prefix}
        suffix={suffix}
        value={value}
        onValueChange={(value) => setValue(value ?? "")}
        decimalSeparator={decimal}
        groupSeparator={thousand}
        disableGroupSeparators={!numberFormat}
        className="p-4 mt-2 text-black bg-white border rounded-lg outline-none placeholder:text-text-gray focus:ring-2 focus:ring-gray-500 border-border-gray font-poppins"
        allowNegativeValue={allowNegative}
        {...inputProps}
      />
    </div>
  );
};

export default InputField;
