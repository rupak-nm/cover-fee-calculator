import { Content, Overlay, Portal, Root } from "@radix-ui/react-dialog";
import { XIcon } from "@svg";
import { classNames } from "@utils/functions";
import Link from "next/link";
import { FC, ReactNode, useState } from "react";
import { navLinks } from ".";
import { LanguageSelect } from "./LanguageSelect";

interface NavModalProps {
  open: boolean;
  onClose: Function;
  navKey: string;
}

export const NavModal: FC<NavModalProps> = ({
  open,
  onClose,
  navKey,
  children,
}) => {
  return (
    <Root open={open} onOpenChange={() => onClose()}>
      <Portal>
        <Overlay
          className={classNames(
            "fixed inset-0 z-40 overflow-y-auto bg-prim-blue bg-opacity-80 backdrop-blur"
          )}
        />

        <Content className="fixed top-0 z-50 w-full h-full max-h-screen overflow-y-auto">
          <div className="m-0 p-5 sm:p-7.5 w-full h-full">
            <div className="flex justify-end">
              <button onClick={() => onClose()}>
                <XIcon className="text-white" />
              </button>
            </div>

            <div className="px-10 mt-5 sm:px-24">
              <LanguageSelect />
            </div>

            <div className="flex flex-col items-start px-10 pb-10 mt-16 sm:px-24 gap-y-16 sm:gap-y-24">
              {navLinks.map(({ label, href }, idx) => (
                <Link href={href} key={idx}>
                  <a
                    className={classNames(
                      "font-poppins text-2xll sm:text-large",
                      href.substring(1) === navKey
                        ? "font-semibold text-text-prim border-b-3.5 border-text-prim pb-2.5 sm:pb-4"
                        : "font-normal text-white"
                    )}
                  >
                    {label}
                  </a>
                </Link>
              ))}

              {children}
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};
