import { Listbox } from "@headlessui/react";
import { GlobeIcon } from "@svg";
import { useState } from "react";

type option = { name: string; value: string };
const LanguageOptions = [{ name: "EN", value: "en" }];

export const LanguageSelect = () => {
  const [lang, setLanguage] = useState(LanguageOptions[0]);

  const handleChange = (val: option) => {
    const _selected = LanguageOptions.find((l) => l.value === val.value);
    setLanguage(_selected ?? LanguageOptions[0]);
  };

  return (
    <div className="flex items-center">
      <Listbox
        as={"div"}
        value={lang}
        onChange={handleChange}
        className="relative"
      >
        <Listbox.Button
          className={`w-full outline-none ring-0 focus:ring-3/2 ring-prim-border focus:shadow-input text-left flex items-center gap-x-2 text-white`}
        >
          <GlobeIcon />
          <span className="text-lg underline font-poppins sm:text-2xl">
            {lang.name}
          </span>
        </Listbox.Button>
        <Listbox.Options
          className={
            "absolute w-full left-7 bg-white border border-border-gray rounded-lg overflow-hidden focus:shadow-input focus:outline-none"
          }
        >
          {LanguageOptions.map(({ name, value }, idx) => (
            <Listbox.Option
              value={value}
              key={idx}
              className={`px-4 py-3 cursor-default ${
                lang.value === value
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
