import FormInput from "@components/FormInput";
import { AddBtn, RemoveBtn, TrashIcon } from "@svg";
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
          inputClass={i === 0 ? "mt-2" : "mt-0"}
          {...formInputProps}
          sideElement={
            i !== 0 && (
              <div className="relative ">
                <div className="absolute flex items-center justify-center h-full ml-2 sm:ml-4 ">
                  <button
                    className="p-2 border rounded border-teal-light outline-0 focus:ring-2 focus:ring-prim-border"
                    onClick={() => handleRemoveClick(i)}
                  >
                    <TrashIcon className="text-text-gray" />
                  </button>
                </div>
              </div>
            )
          }
        >
          <div
            className={classNames(
              // i === 0 && value.length !== 1 ? "h-0" : "h-6",
              "flex justify-end",
              i === value.length - 1 && i < maxFields - 1
                ? "h-6 mt-1"
                : "h-4 mt-0",
              i === value.length - 1 ? "absolute -bottom-2 right-0" : ""
            )}
          >
            {i === value.length - 1 && i < maxFields - 1 && (
              <button
                className="outline-0 focus:ring-2 focus:ring-prim-border"
                onClick={handleAddClick}
              >
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
