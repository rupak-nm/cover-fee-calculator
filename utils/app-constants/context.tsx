import React, { FC, useEffect, useState } from "react";
import { registry } from "@neptunemutual/sdk";

import { useNetwork } from "@wallet/context/Network";
import { getProviderOrSigner } from "@wallet/utils/web3";
import { useWeb3React } from "@web3-react/core";

const initValue = {
  liquidityTokenAddress: "",
  NPMTokenAddress: "",
};

const AppConstantsContext = React.createContext(initValue);

export function useAppConstants() {
  const context = React.useContext(AppConstantsContext);
  if (context === undefined) {
    throw new Error(
      "useAppConstants must be used within a AppConstantsProvider"
    );
  }
  return context;
}

export const AppConstantsProvider: FC = ({ children }) => {
  const [data, setData] = useState(initValue);
  const { networkId } = useNetwork();
  const { library, account } = useWeb3React();

  const setAddress = (_address: string, key: string) => {
    setData((prev) => ({
      ...prev,
      [key]: _address,
    }));
  };

  useEffect(() => {
    if (!networkId || !account) return;
    const signerOrProvider = getProviderOrSigner(library, account, networkId);

    registry.Stablecoin.getAddress(networkId, signerOrProvider).then((_addr) =>
      setAddress(_addr, "liquidityTokenAddress")
    );

    registry.NPMToken.getAddress(networkId, signerOrProvider).then((_addr) =>
      setAddress(_addr, "NPMTokenAddress")
    );
  }, [account, library, networkId]);

  return (
    <AppConstantsContext.Provider value={{ ...data }}>
      {children}
    </AppConstantsContext.Provider>
  );
};
