import { FC, Fragment, ReactNode } from "react";
import { Listbox, Transition } from "@headlessui/react";
import ChevronDownIcon from "@utils/SVG/ChevronDownIcon";
import { classNames } from "@utils/functions";
import { getParsedKey } from "@utils/helpers/cover";
import { useRouter } from "next/router";
import { DownArrow } from "@svg";

/* import { getCoverImgSrc } from "@/src/helpers/cover"; */

interface CoverDropdownProps {
  prefix?: string | ReactNode;
  options: any[];
  selected: {
    id: string;
    key: string;
  };
  setSelected: (val: any) => any;
}

export const CoverDropdown: FC<CoverDropdownProps> = ({
  prefix = "",
  options,
  selected,
  setSelected,
}) => {
  const router = useRouter();

  const handleOptionClick = (
    option: { id: string; key: string } | undefined
  ) => {
    if (!option) {
      return router.push({
        pathname: router.pathname,
      });
    }
    router.push({
      pathname: router.asPath.split("?")[0],
      query: { cover: getParsedKey(option.key) },
    });
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-full sm:w-fit">
        <Listbox.Button className="relative w-full px-4 py-2 pr-12 bg-white border rounded-lg cursor-default border-DAE2EB border-B0C4DB focus:outline-none focus-visible:ring-2 focus-visible:ring-4e7dd9 sm:min-w-300px">
          <span className="flex items-center pr-3 capitalize truncate text-text-gray">
            {prefix}
            {getParsedKey(selected?.key)} cover
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center py-2 pl-3 pr-3 pointer-events-none text-9B9B9B">
            <DownArrow className="w-3 h-3 text-prim-blue" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Listbox.Option
              id="reporting-dropdown"
              className={({ active }) =>
                classNames(
                  `cursor-default select-none relative px-1`,
                  active ? "text-4e7dd9" : "text-black"
                )
              }
              value={undefined}
            >
              {({ _selected, active }: { _selected: any; active: boolean }) => (
                <>
                  <span
                    className={classNames(
                      `truncate px-4 py-2 flex items-center capitalize text-text-gray`,
                      _selected ? "font-medium" : "font-normal",
                      active ? "bg-EEEEEE bg-opacity-50 rounded-lg" : ""
                    )}
                    onClick={() => handleOptionClick(undefined)}
                  >
                    All Covers
                  </span>
                </>
              )}
            </Listbox.Option>
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                id="reporting-dropdown"
                className={({ active }) =>
                  classNames(
                    `cursor-default select-none relative px-1`,
                    active ? "text-4e7dd9" : "text-black"
                  )
                }
                value={option}
              >
                {({
                  _selected,
                  active,
                }: {
                  _selected: any;
                  active: boolean;
                }) => (
                  <>
                    <span
                      className={classNames(
                        `truncate px-4 py-2 flex items-center capitalize text-text-gray`,
                        _selected ? "font-medium" : "font-normal",
                        active ? "bg-EEEEEE bg-opacity-50 rounded-lg" : ""
                      )}
                      onClick={() => handleOptionClick(option)}
                    >
                      {getParsedKey(option.key)} cover
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
