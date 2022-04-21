import { FC, ReactChild, ReactNode } from "react";
import { getNumberSeparators } from "@utils/formatting";
import CurrencyInput from "react-currency-input-field";
import { classNames } from "@utils/functions";

interface FormInputProps {
  label: string;
  value: string;
  setValue: (val: string) => any;
  type?: string;
  helpText?: string | ReactChild;
  id?: string;
  name?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  className?: string;
  inputProps?: Object;
  numberFormat?: boolean;
  allowNegative?: boolean;
  allowDecimals?: boolean;
  textfield?: boolean;
  tokenName?: string;
  inputClass?: string;
  children?: ReactNode;
  disabled?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  label,
  value,
  setValue,
  type = "number",
  helpText = "",
  id,
  name,
  placeholder = "",
  className = "",
  inputProps = {},
  prefix = "",
  suffix = "",
  numberFormat = true,
  allowNegative = false,
  allowDecimals = true,
  textfield = false,
  tokenName = null,
  inputClass = "",
  disabled = false,
  children,
}) => {
  const { decimal, thousand } = getNumberSeparators();

  const inputfieldClass = classNames(
    "p-4 mt-2 text-black bg-white border rounded-lg outline-none placeholder:text-text-gray border-border-gray font-poppins flex-grow min-w-0",
    tokenName
      ? "rounded-r-none focus:ring-2 ring-inset focus:ring-prim-border"
      : "focus:ring-2 focus:ring-prim-border"
  );
  return (
    <div className={`flex flex-col font-poppins relative ${className}`}>
      {label && (
        <label className="text-sm font-semibold uppercase font-poppins text-prim-blue">
          {label}
        </label>
      )}
      <div className="flex">
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
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
            {...inputProps}
          />
        )}
        {tokenName && (
          <div className="px-6 py-4 mt-2 text-white rounded-r-lg bg-prim-blue">
            {tokenName}
          </div>
        )}
      </div>
      {helpText && (
        <p className="pt-1 text-xs font-poppins text-text-gray">{helpText}</p>
      )}
      {children ?? <></>}
    </div>
  );
};

export default FormInput;
