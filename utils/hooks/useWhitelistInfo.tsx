import { getGraphURL } from "@config/environment";
import { getParsedKey, toBytes32 } from "@utils/helpers/cover";
import { useNetwork } from "@wallet/context/Network";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ROWS_PER_PAGE = 50;

const getQuery = (coverKey:any, limit:number, skip:number) => {
    return `
        {
            coverUserWhitelistUpdatedEvents(
                where: {
                    key: "0x7832643200000000000000000000000000000000000000000000000000000000"
                }
                skip:${skip}
                first:${limit}
            ){ 
                id
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

    const router = useRouter()
    const { id: cover_id } = router.query;
    const coverKey = toBytes32(cover_id === undefined ? "" : cover_id?.toString());
    let covername = getParsedKey("0x7832643200000000000000000000000000000000000000000000000000000000")

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

            const isLastPage = res.data.coverUserWhitelistUpdatedEvents.length === 0 ||
            res.data.coverUserWhitelistUpdatedEvents.length < ROWS_PER_PAGE;
            if (isLastPage) {
                setHasMore(false);
              }
            
              setData((prev) => ({
                  whitelisted:res.data.coverUserWhitelistUpdatedEvents
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
          transactions: data?.whitelisted,
          totalCount: data?.whitelisted.length,
        },
        loading,
      };
}