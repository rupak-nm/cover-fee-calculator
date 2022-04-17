import { utils } from "@neptunemutual/sdk";
import { getStoredData } from "./getStoredData";

export const getCoverCreationFee = async (networkId: any, provider: any) => {
  const candidates = [
    {
      key: [utils.keyUtil.PROTOCOL.NS.COVER_CREATION_FEE],
      returns: "uint256",
      property: "coverCreationFees",
      compute: async ({ value }: { value: any }) => {
        return value.toString();
      },
    },
  ];

  const result = await getStoredData(candidates, networkId, provider);

  return result?.coverCreationFees;
};
