import { FC, ReactNode } from "react";

interface InfoTextProps {
  label: string;
  text: string | ReactNode;
}

const InfoText: FC<InfoTextProps> = ({ label, text }) => (
  <>
    <p className="text-text-gray uppercase text-xs font-semibold">{label}</p>
    <h2
      title={typeof text === "string" ? text : ""}
      className="text-lg font-bold mt-2 overflow-hidden text-ellipsis"
    >
      {text}
    </h2>
  </>
);

export default InfoText;
