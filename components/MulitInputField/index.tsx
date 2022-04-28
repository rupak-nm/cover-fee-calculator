import FormInput from "@components/FormInput";
import { AddBtn, RemoveBtn } from "@svg";
import { classNames } from "@utils/functions";
import { FC } from "react";

interface MultiInputFieldProps {
  value: string[];
  setValue: (values: string[]) => any;
  label: string;
  placeholder?: string[] | string;
  helpText?: string;
  className?: string;
  formInputProps?: Object;
  maxFields?: number;
}

const MultiInputField: FC<MultiInputFieldProps> = ({
  value,
  setValue,
  label,
  placeholder = "",
  helpText = "",
  className = "",
  formInputProps = {},
  maxFields = Infinity,
}) => {
  const handleInputChange = (val: string, i: number) => {
    let arr = value;
    arr[i] = val;
    setValue(arr);
  };

  const handleAddClick = () => {
    const arr = value;
    arr.push("");
    setValue(arr);
  };

  const handleRemoveClick = (i: number) => {
    const arr = value;
    arr.splice(i, 1);
    setValue(arr);
  };

  return (
    <div className={classNames("", className)}>
      {value.map((val, i) => (
        <FormInput
          key={i}
          label={i === 0 ? label : ""}
          placeholder={
            typeof placeholder === "string" ? placeholder : placeholder[i]
          }
          value={val}
          setValue={(val) => handleInputChange(val, i)}
          type="text"
          helpText={i === value.length - 1 ? helpText : ""}
          {...formInputProps}
        >
          <div
            className={classNames(
              // i === 0 && value.length !== 1 ? "h-0" : "h-6",
              "h-6 mt-1 flex justify-end gap-x-4",
              i === value.length - 1 ? "absolute -bottom-2 right-0" : ""
            )}
          >
            {i !== 0 && (
              <button onClick={() => handleRemoveClick(i)}>
                <RemoveBtn className="text-red-600" />
              </button>
            )}
            {i === value.length - 1 && i < maxFields - 1 && (
              <button onClick={handleAddClick}>
                <AddBtn className="text-prim-blue" />
              </button>
            )}
          </div>
        </FormInput>
      ))}
    </div>
  );
};

export { MultiInputField };
