import { utils } from "@neptunemutual/sdk";
import React, { ReactChild, useState } from "react";

const initValue: { data: any; getIpfsByHash: any } = {
  data: [],
  getIpfsByHash: (_hash: any) => {},
};

const IpfsContext = React.createContext(initValue);

export function useIpfs() {
  const context = React.useContext(IpfsContext);
  if (context === undefined) {
    throw new Error("useIpfs must be used within a IpfsProvider");
  }
  return context;
}

export const IpfsProvider = ({ children }: { children: ReactChild }) => {
  const [data, setData] = useState({});

  const updateState = (hash: any, _data: any) => {
    setData((prev) => {
      return {
        ...prev,
        [hash]: _data,
      };
    });
  };

  const getIpfsByHash = (hash: any) => {
    updateState(hash, {}); // to avoid recursive calls
    utils.ipfs
      .read(hash)
      .then((ipfsData) => updateState(hash, ipfsData))
      .catch(() => updateState(hash, {})); // Provide fallback to stop infinite retries
  };

  return (
    <IpfsContext.Provider value={{ data, getIpfsByHash }}>
      {children}
    </IpfsContext.Provider>
  );
};
