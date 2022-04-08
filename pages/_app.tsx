import "@fontsource/poppins";
import "@fontsource/sora";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DataProvider } from "lib/chart/context";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "@wallet/utils/web3";
import { NetworkProvider } from "@wallet/context/Network";
import { UnlimitedApprovalProvider } from "@wallet/context/UnlimitedApproval";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <NetworkProvider>
        <UnlimitedApprovalProvider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </UnlimitedApprovalProvider>
      </NetworkProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
