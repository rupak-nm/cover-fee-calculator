import { RemoveBtn } from "@svg";
import { classNames } from "@utils/functions";
import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react";

interface TagsInputProps {
  label: string;
  value: string[];
  setValue: (val: string[]) => any;
  className?: string;
  placeholder?: string;
  helpText?: string;
}

export const TagsInput: FC<TagsInputProps> = ({
  label,
  value,
  setValue,
  className = "",
  placeholder = "",
  helpText = "Enter a comma (,) after each tag.",
}) => {
  const [inputValue, setInputValue] = useState("");

  const removeTags = (index: number) => {
    const arr = value;
    arr.splice(index, 1);
    setValue(arr);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const separatorRegex = new RegExp("^.+,\\s*$");
    if (val.match(separatorRegex)) {
      let newTag = val.trim();
      newTag = newTag.substring(0, newTag.length - 1);
      const arr = [...value, newTag];
      setValue(arr);
      setInputValue("");
    } else setInputValue(val);
  };

  const handleKeyDown = (e: KeyboardEvent | any) => {
    if (
      inputValue === "" &&
      (e.key === "Backspace" || e.code === "Backspace")
    ) {
      if (value.length) removeTags(value.length - 1);
    }
  };

  return (
    <div>
      <label className="text-sm font-semibold uppercase font-poppins text-prim-blue">
        {label}
      </label>
      <div
        className={classNames(
          "p-4 text-black mt-2 bg-white border rounded-lg outline-none border-border-gray font-poppins ring-0 focus-within:ring-2 ring-prim-border",
          className
        )}
      >
        <ul className="flex flex-wrap items-center gap-2">
          {value.map((tag, index) => (
            <li
              key={index}
              className="relative flex items-center justify-between max-w-full gap-2 p-2 py-1 overflow-hidden text-sm text-white rounded-full bg-prim-blue"
            >
              <span className="overflow-hidden text-ellipsis">{tag}</span>
              <span className="ml-2 bg-white rounded-lg cursor-pointer">
                <RemoveBtn
                  onClick={() => removeTags(index)}
                  width={16}
                  height={16}
                  innerFill={"#01052D"}
                >
                  close
                </RemoveBtn>
              </span>
            </li>
          ))}
          <input
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e)}
            className={classNames(
              "text-h4 block flex-shrink-0 pl-1 flex-grow rounded-lg focus:outline-none focus-visible:none"
            )}
          />
        </ul>
      </div>
      <p className="pt-1 text-xs font-poppins text-text-gray">{helpText}</p>
    </div>
  );
};
