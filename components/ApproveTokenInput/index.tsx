import FormInput from "@components/FormInput";
import { RegularButton } from "@components/RegularButton";
import { classNames } from "@utils/functions";
import { FC, ReactChild } from "react";

interface ApproveTokenInputProps {
  label: string;
  tokenName: string;
  value: string;
  setValue: (val: string) => any;
  handleCLick: Function;
  disabled?: boolean;
  placeholer?: string;
  helpText?: string | ReactChild;
  className?: string;
  btnText?: string;
}

export const ApproveTokenInput: FC<ApproveTokenInputProps> = ({
  label,
  tokenName,
  value,
  setValue,
  handleCLick,
  disabled = false,
  placeholer = "",
  helpText = "",
  className = "",
  btnText,
}) => {
  return (
    <div className={classNames(className)}>
      <FormInput
        label={label}
        value={value}
        setValue={setValue}
        helpText={helpText}
        placeholder={placeholer}
        tokenName={tokenName}
      />
      <RegularButton
        text={btnText ?? "Approve " + tokenName}
        className="mt-6"
        onClick={(e) => handleCLick(e)}
        disabled={disabled}
      />
    </div>
  );
};
