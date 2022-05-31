import { XIcon } from "@svg";
import { ElementType, FC } from "react";

type DisplayCard = {
  Icon: ElementType;
  text: string;
  profile: string;
};

interface DisplayProfilesProps {
  profiles: DisplayCard[];
  onDelete: (profile: string) => any;
}

export const DisplayProfiles: FC<DisplayProfilesProps> = ({
  profiles,
  onDelete,
}) => (
  <>
    {profiles.length ? (
      <div className="mt-1 space-y-1">
        {profiles.map(({ Icon, text, profile }, i) => (
          <div
            key={i}
            className={`w-full outline-none ring-0 focus:ring-3/2 ring-prim-border focus:shadow-input text-left flex gap-x-2 text-text-gray bg-white px-4.5 pr-3.5 py-4 border border-border-gray rounded-lg`}
          >
            <Icon className="flex-shrink-0" />
            <div className="flex-grow overflow-hidden">
              <div className="flex">
                <span className="overflow-hidden text-base font-poppins whitespace-nowrap text-ellipsis">
                  {text}
                </span>
              </div>
            </div>
            <button
              onClick={() => onDelete(profile)}
              className="px-1 ml-auto bg-black bg-opacity-0 rounded hover:bg-opacity-10"
            >
              <XIcon className="w-2 h-2 text-black" />
            </button>
          </div>
        ))}
      </div>
    ) : (
      <></>
    )}
  </>
);
