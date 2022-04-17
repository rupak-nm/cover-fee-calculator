import React, { ReactChild, useEffect, useState } from "react";

import { useEagerConnect } from "@wallet/hooks/useEagerConnect";
import { useInactiveListener } from "@wallet/hooks/useInactiveListener";
import { getNetworkId } from "@config/environment";

const NetworkContext = React.createContext<any>({ networkId: null });

export function useNetwork() {
  const context = React.useContext(NetworkContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppWrapper");
  }
  return context;
}

export const NetworkProvider = ({ children }: { children: ReactChild }) => {
  const [networkId, setNetworkId] = useState<number>();

  useEffect(() => {
    setNetworkId(getNetworkId());
  }, []);

  return (
    <NetworkContext.Provider value={{ networkId }}>
      {networkId && <PostNetworkIdLoad networkId={networkId} />}
      {children}
    </NetworkContext.Provider>
  );
};

// This component makes sure that given hooks are only executed once after networkId is loaded
const PostNetworkIdLoad = ({ networkId }: { networkId: any }) => {
  useEagerConnect(networkId);
  useInactiveListener(networkId);

  return null;
};
