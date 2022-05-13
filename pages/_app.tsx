import "@fontsource/poppins/latin.css";
import "@fontsource/sora/latin.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DataProvider } from "lib/chart/context";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "@wallet/utils/web3";
import { NetworkProvider } from "@wallet/context/Network";
import { UnlimitedApprovalProvider } from "@wallet/context/UnlimitedApproval";
import { AppConstantsProvider } from "@utils/app-constants/context";
import { ToastProvider } from "@toast/provider";
import { TxPosterProvider } from "lib/tx-poster/context";
import { DEFAULT_VARIANT } from "@config/toast";
import { IpfsProvider } from "lib/ipfs/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <NetworkProvider>
        <AppConstantsProvider>
          <IpfsProvider>
            <UnlimitedApprovalProvider>
              <ToastProvider variant={DEFAULT_VARIANT}>
                <TxPosterProvider>
                  <DataProvider>
                    <Component {...pageProps} />
                  </DataProvider>
                </TxPosterProvider>
              </ToastProvider>
            </UnlimitedApprovalProvider>
          </IpfsProvider>
        </AppConstantsProvider>
      </NetworkProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
