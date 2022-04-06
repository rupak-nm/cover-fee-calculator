import FormInput from "@components/FormInput";
import { RegularButton } from "@components/RegularButton";
import { classNames } from "@utils/functions";
import { FC } from "react";

interface ApproveTokenInputProps {
  label: string;
  tokenName: string;
  value: string;
  setValue: (val: string) => any;
  approved: boolean;
  onApproved: (approved: boolean) => any;
  placeholer?: string;
  helpText?: string;
  className?: string;
}

export const ApproveTokenInput: FC<ApproveTokenInputProps> = ({
  label,
  tokenName,
  value,
  setValue,
  approved,
  onApproved,
  placeholer = "",
  helpText = "",
  className = "",
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
        text={"Approve " + tokenName}
        className="mt-6"
        onClick={() => onApproved(true)}
      />
    </div>
  );
};
