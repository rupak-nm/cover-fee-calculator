import { useTxPoster } from "lib/tx-poster/context";

export const useInvokeMethod = () => {
  const { invoke } = useTxPoster();

  return { invoke };
};
