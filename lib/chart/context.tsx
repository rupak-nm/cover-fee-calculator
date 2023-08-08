import useLocalStorage from "@utils/hooks/useLocalStorage";
import { createContext, ReactChild, useMemo, useState } from "react";

export type dataType = {
  floor: string;
  ceiling: string;
  inVault: string;
  totalCommitment: string;
  reassuranceAmount: string;
  coverAmount: string;
  duration: string;
};

const initialValue = {
  floor: "0.025",
  ceiling: "0.25",
  inVault: "30000000",
  totalCommitment: "1000000",
  reassuranceAmount: "1000000",
  coverAmount: "10000",
  duration: "1",
};

const DataContext = createContext<{
  data: dataType;
  setData: Function;
}>({
  data: initialValue,
  setData: () => {},
});

const DataProvider = ({ children }: { children: ReactChild }) => {
  const [localvalue, setLocalvalue] = useLocalStorage<dataType>(
    "chart-data",
    initialValue
  );
  const [data, setData] = useState<dataType>(localvalue);

  const value = useMemo(
    () => ({
      data,
      setData: (data: dataType) => {
        setLocalvalue(data);
        setData(data);
      },
    }),
    [data]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataProvider, DataContext };
