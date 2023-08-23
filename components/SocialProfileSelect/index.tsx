import { Listbox, Transition } from "@headlessui/react";
import {
  AvatarIcon,
  BlogIcon,
  DiscordIcon,
  DocumentationIcon,
  DownArrow,
  FacebookIcon,
  GithubIcon,
  LinkedInIcon,
  SlackIcon,
  TelegramIcon,
  TwitterIcon,
  WebIcon,
  XIcon,
} from "@svg";
import { classNames } from "@utils/functions";
import { useClickOutside } from "@utils/hooks/useClickOutside";
import { ElementType, FC, useEffect, useRef, useState } from "react";
import { DisplayProfiles } from "./DisplayProfiles";

type Profile = { Icon: ElementType; name: string; value: string };
export type Saved = { Icon: ElementType; text: string; profile: string };

interface SocialProfileSelectProps {
  value: Saved[];
  setValue: (value: Saved[]) => any;
  wrapperClass?: string;
  label: string;
  required?: boolean;
}

interface DisplayCardProps {
  Icon: ElementType;
  text: string;
  onDelete: Function;
}

const profileList: Profile[] = [
  {
    Icon: WebIcon,
    name: "Website",
    value: "website",
  },
  {
    Icon: DocumentationIcon,
    name: "Documentation",
    value: "documentation",
  },
  {
    Icon: TelegramIcon,
    name: "Telegram",
    value: "telegram",
  },
  {
    Icon: TwitterIcon,
    name: "Twitter",
    value: "twitter",
  },
  {
    Icon: GithubIcon,
    name: "Github",
    value: "github",
  },
  {
    Icon: FacebookIcon,
    name: "Facebook",
    value: "facebook",
  },
  {
    Icon: BlogIcon,
    name: "Blog",
    value: "blog",
  },
  {
    Icon: DiscordIcon,
    name: "Discord",
    value: "discord",
  },
  {
    Icon: LinkedInIcon,
    name: "LinkedIn",
    value: "linkedin",
  },
  {
    Icon: SlackIcon,
    name: "Slack",
    value: "slack",
  },
];

const initialSelected: Profile = {
  Icon: AvatarIcon,
  name: "Select Social Profile",
  value: "",
};

export const SocialProfileSelect: FC<SocialProfileSelectProps> = ({
  value,
  setValue,
  wrapperClass,
  label,
  required = false,
}) => {
  const [selected, setSelected] = useState<Profile>(initialSelected);
  const [listOpen, setListOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const divRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useClickOutside(divRef, () => {
    if (!inputVal) setSelected(initialSelected);
    setListOpen(false);
  });

  const dropdownList = profileList.filter(
    (p) => !value.map((s) => s.profile).includes(p.value)
  );

  const handleChange = (v: Profile) => {
    if (typeof v === "string") {
      setSelected(profileList.find((p) => p.value === v) ?? initialSelected);
    }
  };

  useEffect(() => {
    if (inputRef?.current?.focus) inputRef.current.focus();
  }, [selected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" || e.code === "Escape") setListOpen(false);
    if (e.key === "ArrowDown" || e.code === "ArrowDown") setListOpen(true);
    if (e.key === "Enter" || e.code === "Enter") handleSave(selected.value);
  };

  const handleDefaultDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelected(initialSelected);
    setInputVal("");
    setListOpen(false);
  };

  const isValidInput = (val: string) => {
    const UrlRegex =
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)$/;
    return val.match(UrlRegex);
  };

  const handleSave = (val: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.stopPropagation();
    if (!isValidInput(inputVal)) return;
    const _saved = [...value];
    const itemIndex = _saved.findIndex((p) => p.profile === val);
    if (itemIndex >= 0) _saved[itemIndex].text = inputVal;
    else {
      const _icon =
        profileList.find((p) => p.value === val)?.Icon ?? initialSelected.Icon;
      _saved.push({ profile: val, Icon: _icon, text: inputVal });
    }
    setValue(_saved);
    setInputVal("");
    setSelected(initialSelected);
  };

  const handleDisplayCardDelete = (profile: string) => {
    const _saved = [...value];
    const itemIndex = _saved.findIndex((p) => p.profile === profile);
    _saved.splice(itemIndex, 1);
    setValue(_saved);
  };

  return (
    <div className={classNames(wrapperClass, "flex flex-col")}>
      {label && (
        <label className="text-sm font-semibold leading-6 tracking-wider uppercase font-poppins text-prim-blue">
          {label}
          {required && (
            <span className="text-base text-red-700 font-poppins">*</span>
          )}
        </label>
      )}

      <DisplayProfiles
        profiles={value}
        onDelete={(profile) => handleDisplayCardDelete(profile)}
      />

      <div ref={divRef} className={classNames(value.length ? "mt-4" : "mt-1")}>
        <Listbox
          as={"div"}
          value={selected}
          onChange={handleChange}
          className="relative"
        >
          <button
            className={classNames(
              "w-full outline-none focus:shadow-input text-left flex items-center gap-x-2 text-text-gray bg-white px-4.5 pr-3.5 border border-border-gray",
              listOpen ? "rounded-t-lg" : "rounded-lg",
              selected.value ? "py-15px" : "py-4"
            )}
            onClick={() => {
              if (inputRef?.current?.focus) inputRef.current.focus();
              setListOpen((val) => !val);
            }}
          >
            <selected.Icon />
            {selected.value ? (
              <div className="flex flex-grow gap-2">
                <input
                  className="flex-grow pl-2 text-sm leading-6 border border-transparent rounded outline-none focus:border-prim-border"
                  ref={inputRef}
                  onKeyDown={(e) => handleKeyDown(e)}
                  value={inputVal}
                  onChange={(e) => handleInputChange(e)}
                  required
                  type="text"
                />
                <button
                  className="px-4 text-sm leading-5 text-prim-border"
                  onClick={(e) => handleSave(selected.value, e)}
                >
                  Save
                </button>
                <button
                  onClick={(e) => handleDefaultDelete(e)}
                  className="px-1 bg-black bg-opacity-0 rounded hover:bg-opacity-10"
                >
                  <XIcon className="w-2 h-2 text-black" />
                </button>
              </div>
            ) : (
              <>
                <span className="text-base font-poppins">{selected.name}</span>
                <button className="ml-auto">
                  <DownArrow
                    className={classNames(
                      "w-3 h-3 transform text-black",
                      listOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>
              </>
            )}
          </button>
          <Transition show={listOpen}>
            <Listbox.Options
              className={
                "absolute w-full bg-white border border-border-gray z-40 overflow-hidden rounded-b-lg focus:outline-none max-h-56 overflow-y-auto py-2 shadow-dropdown2"
              }
            >
              {dropdownList.map(({ name, value, Icon }, idx) => (
                <Listbox.Option
                  value={value}
                  key={idx}
                  className={classNames(
                    "flex items-center text-text-gray gap-x-2 bg-black bg-opacity-0 hover:bg-opacity-10 px-4 py-2 outline-2 cursor-default"
                  )}
                >
                  <Icon />
                  <span className="text-sm leading-6 font-poppins">{name}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  );
};
