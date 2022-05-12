import { FC, ReactNode } from "react";

interface InfoTextProps {
  label: string;
  text: string | ReactNode;
}

const InfoText: FC<InfoTextProps> = ({ label, text }) => (
  <>
    <p className="text-xs font-semibold uppercase text-text-gray">{label}</p>
    <h2
      title={typeof text === "string" ? text : ""}
      className="mt-2 overflow-hidden text-xl font-bold text-ellipsis"
    >
      {text}
    </h2>
  </>
);

export default InfoText;
