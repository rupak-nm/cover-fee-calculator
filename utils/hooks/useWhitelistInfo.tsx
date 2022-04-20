import { getGraphURL } from "@config/environment";
import { useNetwork } from "@wallet/context/Network";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const ROWS_PER_PAGE = 50;

const getQuery = (account:any, limit:number, skip:number) => {
    return `
        {
            coverUserWhitelistUpdatedEvents {
            id
            key
            status
            account
            createdAtTimestamp
            }
        }
    `
}

export const useWhiteListInfo = () => {
    interface stateData{
        whitelisted: any[]
    }

    const [data, setData] = useState<stateData>({
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
    
    useEffect(() => {
        if(!networkId || !account){
            return;
        }

        const graphURL = getGraphURL(networkId);

        if(!graphURL) {
            return
        }

        setLoading(true);

        fetch(graphURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify({
                  query: getQuery(account, ROWS_PER_PAGE, itemsToSkip),
              })
        }).then((r) => r.json())
        .then((res)=> {
            if(res.errors || !res.data){
                return;
            }

            const isLastPage = res.data.coverUserWhitelistUpdatedEvents.length === 0 ||
            res.data.coverUserWhitelistUpdatedEvents.length < ROWS_PER_PAGE;
            console.log(res.data)
            if (isLastPage) {
                setHasMore(false);
              }
            
              setData((prev) => ({
                  whitelisted:[
                      ...res.data.coverUserWhitelistUpdatedEvents
                  ]
              }))
        }).catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [account,networkId,itemsToSkip])
    
    const handleShowMore = () => {
        setItemsToSkip((prev) => prev + ROWS_PER_PAGE);
    };

    return {
        handleShowMore,
        hasMore,
        data: {
          transactions: data?.whitelisted,
          totalCount: data?.whitelisted.length,
        },
        loading,
      };
}