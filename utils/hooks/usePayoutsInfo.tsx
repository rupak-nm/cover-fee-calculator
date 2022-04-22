import { getGraphURL } from "@config/environment";
import { useNetwork } from "@wallet/context/Network";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const ROWS_PER_PAGE = 50;

const getQuery = (coverKey:any, limit:number, skip:number) => {
    return `
        {
            claimedEvents (
                where: {
                    key: "${coverKey}"
                }
                skip:${skip}
                first:${limit}
            )
            {
                id
                incidentDate
                account
                amount
                claimed
                createdAtTimestamp
            }
        }
    `
}

export const usePayoutsInfo = (coverKey: {coverKey: string}) => {
    interface stateData{
        payouts: any[]
    }

    const [data, setData] = useState<stateData>({
        payouts: [],
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
                  query: getQuery(coverKey, ROWS_PER_PAGE, itemsToSkip),
              })
        }).then((r) => r.json())
        .then((res)=> {
            if(res.errors || !res.data){
                return;
            }

            const isLastPage = res.data.claimedEvents.length === 0 ||
            res.data.claimedEvents.length < ROWS_PER_PAGE;
            console.log("res.data", res.data)
            if (isLastPage) {
                setHasMore(false);
              }
            
              setData((prev) => ({
                  payouts:[
                      ...res.data.claimedEvents
                  ]
              }))
        }).catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [coverKey, networkId, itemsToSkip, account])

    const handleShowMore = () => {
        setItemsToSkip((prev) => prev + ROWS_PER_PAGE);
      };

    return {
        handleShowMore,
        hasMore,
        data: {
          transactions: data?.payouts,
          totalCount: data?.payouts.length,
        },
        loading,
      };
}