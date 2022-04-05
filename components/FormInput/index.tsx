import { FC, ReactNode } from "react";
import { getNumberSeparators } from "@utils/formatting";
import CurrencyInput from "react-currency-input-field";
import { classNames } from "@utils/functions";

interface FormInputProps {
  label: string;
  value: string;
  setValue: (val: string) => any;
  type?: string;
  helpText?: string;
  id?: string;
  name?: string;
  prefix?: string;
  suffix?: string;
  placeholder: string;
  className?: string;
  inputProps?: Object;
  numberFormat?: boolean;
  allowNegative?: boolean;
  allowDecimals?: boolean;
  textfield?: boolean;
  inputClass?: string;
  children?: ReactNode;
}

const FormInput: FC<FormInputProps> = ({
  label,
  value,
  setValue,
  type = "number",
  helpText = "",
  id,
  name,
  placeholder,
  className = "",
  inputProps = {},
  prefix = "",
  suffix = "",
  numberFormat = true,
  allowNegative = false,
  allowDecimals = true,
  textfield = false,
  inputClass = "",
  children,
}) => {
  const { decimal, thousand } = getNumberSeparators();

  const inputfieldClass =
    "p-4 mt-2 text-black bg-white border rounded-lg outline-none placeholder:text-text-gray focus:ring-2 focus:ring-prim-border border-border-gray font-poppins";
  return (
    <div className={`flex flex-col font-poppins relative ${className}`}>
      {label && (
        <label className="text-sm font-semibold uppercase text-prim-blue">
          {label}
        </label>
      )}
      {type === "number" ? (
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
          className={classNames(inputfieldClass, inputClass)}
          allowNegativeValue={allowNegative}
          allowDecimals={allowDecimals}
          {...inputProps}
        />
      ) : textfield ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value ?? "")}
          className={classNames(inputfieldClass, "h-40", inputClass)}
          {...inputProps}
        />
      ) : (
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value ?? "")}
          className={classNames(inputfieldClass, inputClass)}
          {...inputProps}
        />
      )}
      {helpText && <p className="pt-1 text-xs text-text-gray">{helpText}</p>}
      {children ?? <></>}
    </div>
  );
};

export default FormInput;
