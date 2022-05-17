import { CopiedIcon, CopyIcon2, RemoveBtn } from "@svg";
import { classNames } from "@utils/functions";
import { ChangeEvent, FC, useRef, useState } from "react";

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
  const [showCopiedIcon, setShowCopiedIcon] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const removeTags = (index: number) => {
    const arr = value;
    arr.splice(index, 1);
    setValue(arr);
    inputRef.current?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const splitted = val.split(",").filter((e) => !e.match(/^\s*$/));
    if (splitted.length >= 2) {
      const _tags = splitted;
      const arr = [...value, ..._tags];
      setValue(arr);
      setInputValue("");
    } else {
      const separatorRegex = new RegExp("^.+,\\s*$");
      if (val.match(separatorRegex)) {
        let newTag = val.trim();
        newTag = newTag.substring(0, newTag.length - 1).trim();
        if (!newTag) return;
        const arr = [...value, newTag];
        setValue(arr);
        setInputValue("");
      } else setInputValue(val);
    }
  };

  const handleKeyDown = (e: KeyboardEvent | any) => {
    if (
      inputValue === "" &&
      (e.key === "Backspace" || e.code === "Backspace")
    ) {
      if (value.length) removeTags(value.length - 1);
    }
  };

  const handleCopy = () => {
    if (value.join(",")) {
      try {
        navigator.clipboard.writeText(value.join(","));
        setShowCopiedIcon(true);
        setTimeout(() => {
          setShowCopiedIcon(false);
        }, 3000);
      } catch (err) {
        console.error("Unable to copy");
      }
    }
  };

  return (
    <div>
      <label className="text-sm font-semibold uppercase font-poppins text-prim-blue">
        {label}
      </label>
      <div
        className={classNames(
          "p-4 text-black mt-2 bg-white border rounded-lg outline-none border-border-gray font-poppins ring-0 focus-within:ring-3/2 ring-prim-border focus-within:shadow-input flex items-start justify-between gap-0.5",
          className
        )}
      >
        <div className="flex flex-wrap items-center flex-grow max-w-full gap-2">
          {value.map((tag, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between max-w-full gap-2 p-2 py-1 overflow-hidden text-sm text-white rounded-full bg-prim-blue"
            >
              <span className="overflow-hidden text-ellipsis font-poppins">
                {tag}
              </span>
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
            </div>
          ))}
          <input
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e)}
            className={classNames(
              "block pl-1 flex-1 min-w-100px rounded-lg focus:outline-none focus-visible:none h-7"
            )}
            ref={inputRef}
          />
        </div>

        {/* <button
          className="p-1 transform"
          onClick={handleCopy}
          disabled={showCopiedIcon}
        >
          {!showCopiedIcon ? (
            <CopyIcon2 />
          ) : (
            <CopiedIcon className="text-green-700" />
          )}
        </button> */}
      </div>
      <p className="pt-1 text-xs font-poppins text-text-gray">{helpText}</p>
    </div>
  );
};
