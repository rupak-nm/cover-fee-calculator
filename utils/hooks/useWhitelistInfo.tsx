import { useNetwork } from "@wallet/context/Network";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const ROWS_PER_PAGE = 50;

export const useWhiteListInfo = () => {

    const [data, setData] = useState({
        whitelisted: [],
      });

    const [itemsToSkip, setItemsToSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { networkId } = useNetwork();
    const { account } = useWeb3React();

    useEffect(() => {
        setItemsToSkip(0);
      }, [account]);
    
    let whitelistedMockData = [
        {
            transaction: {
                timestamp: "12/12/2021  12:00:00 UTC",
                accounts: "0xeC73559994D5E4Ca5a16a90a14203A2dae50b545"
            }
        },
        {
            transaction: {
                timestamp: "12/12/2021  12:00:00 UTC",
                accounts: "0xeC73559994D5E4Ca5a16a90a14203A2dae50b1x3"
            }
        },
        {
            transaction: {
                timestamp: "12/12/2021  12:00:00 UTC",
                accounts: "0xeC73559994D5E4Ca5a16a90a14203A2dae50b3ex"
            }
        },
        {
            transaction: {
                timestamp: "12/12/2021  12:00:00 UTC",
                accounts: "0xeC73559994D5E4Ca5a16a90a14203A2dae50b1x3"
            }
        },
    ]

    const handleShowMore = () => {
        setItemsToSkip((prev) => prev + ROWS_PER_PAGE);
      };

    return {
        handleShowMore,
        hasMore,
        data: {
          transactions: whitelistedMockData,
          totalCount: whitelistedMockData.length,
        },
        loading,
      };
}