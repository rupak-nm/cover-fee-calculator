import { utils } from "@neptunemutual/sdk";

export const getStoredData: any = async (
  candidates: any,
  chainId: any,
  provider: any
) => {
  const result = await utils.store.readStorage(chainId, candidates, provider);

  return result;
};
