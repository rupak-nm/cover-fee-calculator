import { Root, Overlay, Content, Portal } from "@radix-ui/react-dialog";
import { classNames } from "@utils/functions";
import { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: Function;
  disabled?: boolean;
  overlayClass?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen = false,
  children,
  onClose,
  disabled = false,
  overlayClass = "",
}) => (
  <Root open={isOpen} onOpenChange={disabled ? () => {} : () => onClose()}>
    <Portal>
      <Overlay
        className={classNames(
          "fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-50",
          overlayClass
        )}
      />

      <Content className="fixed z-50 max-w-full max-h-screen px-3 py-6 overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-max sm:p-0">
        {children}
      </Content>
    </Portal>
  </Root>
);
