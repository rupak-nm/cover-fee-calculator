import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
  getNumberSeparators,
  getLocale,
  getLocaleNumber,
  getPlainNumber,
} from "@utils/formatting";

interface InputFieldProps {
  value: string;
  setValue: (val: string) => any;
  label: string;
  placeholder: string;
  className?: string;
  inputProps?: Object;
  numberFormat?: boolean;
  allowNegative?: boolean;
  allowEmpty?: boolean;
  type?: string;
}

const InputField: FC<InputFieldProps> = ({
  value,
  setValue,
  label,
  placeholder,
  className = "",
  numberFormat = false,
  allowNegative = false,
  allowEmpty = true,
  inputProps = {},
  type = "text",
}) => {
  const [val, setVal] = useState(value);
  // const inputRef = useRef(null);
  // const caretRef = useRef(val.length ?? 0);

  useEffect(() => {
    if (!isNaN(parseInt(value))) {
      const formattedNumber = numberFormat
        ? getLocaleNumber(value, getLocale())
        : value;
      setVal(formattedNumber);
    }
    if (value === "") setVal("");
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    const sep = getNumberSeparators(getLocale());
    const numberRegex = new RegExp(`^(\\d+\\${sep.decimal}?\\d*)?$`);

    if (!numberFormat && type === "number" && !val.match(numberRegex)) return;

    const caret = e.target.selectionStart;
    const element = e.target;
    window.requestAnimationFrame(() => {
      const newPos = val === "" && !numberFormat && !allowEmpty ? 1 : caret;
      element.selectionStart = newPos;
      element.selectionEnd = newPos;
    });

    if (!numberFormat && type === "number")
      return allowEmpty ? setValue(val) : setValue(val || "0");
    // return allowEmpty
    //   ? setValue((parseFloat(val)).toString())
    //   : setValue((parseFloat(val) || "0").toString());

    // regex to identify localized number with decimal separator at the end
    const incompleteRegex = new RegExp(
      `^${allowNegative ? "-?" : ""}\\d*(${sep.thousand}\\d+)*\\${sep.decimal}$`
    );
    if (
      val !== "" &&
      (val.match(incompleteRegex) || (allowNegative && val === "-"))
    ) {
      return setVal(val);
    }

    // regex to identify localized number
    const formattedRegex = new RegExp(
      `^${allowNegative ? "-?" : ""}\\d*(\\${sep.thousand}\\d+)*(\\${
        sep.decimal
      }\\d*)?$`
    );
    if (val !== "" && !val.match(formattedRegex)) return;
    const returnVal = getPlainNumber(val, getLocale());
    return allowEmpty ? setValue(returnVal) : setValue(returnVal || "0");
    // setVal(getLocaleNumber(returnVal, getLocale()));
  };

  return (
    <div className={`flex flex-col font-poppins ${className}`}>
      <label className="text-xs font-semibold uppercase text-text-gray">
        {label}
      </label>
      <input
        type={"text"}
        className="p-4 mt-2 text-black bg-white border rounded-lg outline-none placeholder:text-text-gray focus:ring-2 focus:ring-gray-500 border-border-gray font-poppins"
        placeholder={placeholder}
        value={val}
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  );
};

export default InputField;
