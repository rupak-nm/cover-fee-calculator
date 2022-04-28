import { getGraphURL } from "@config/environment";
import { getParsedKey, toBytes32 } from "@utils/helpers/cover";
import { useNetwork } from "@wallet/context/Network";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ROWS_PER_PAGE = 50;

const getQuery = () => {
    return `
        {
            covers{
                id
                key
            }
        }
    `
}

export const useCoversInfo = () => {

    const [data, setData] = useState();

    const [loading, setLoading] = useState(false);

    const { networkId } = useNetwork();
    const { account } = useWeb3React();

    
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
                  query: getQuery(),
              })
        }).then((r) => r.json())
        .then((res)=> {
            if(res.errors || !res.data){
                return;
            }
            
            setData(res.data)
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));

    }, [ networkId, account])
    
    

    return {
        data,
        loading,
    };
}