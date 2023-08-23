import { utils } from "@neptunemutual/sdk";
import { getStoredData } from "./getStoredData";

export const getCoverMinStake = async (networkId: any, provider: any) => {
  const candidates = [
    {
      key: [utils.keyUtil.PROTOCOL.NS.COVER_CREATION_MIN_STAKE],
      returns: "uint256",
      property: "minCoverCreationStake",
      compute: async ({ value }: { value: any }) => {
        return value.toString();
      },
    },
  ];

  const result = await getStoredData(candidates, networkId, provider);

  return result?.minCoverCreationStake;
};
