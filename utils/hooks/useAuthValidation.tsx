import { useToast } from "@toast/context";
import { SHORT_TOAST_TIME } from "@config/toast";
import { useWeb3React } from "@web3-react/core";

export const useAuthValidation = () => {
  const { account } = useWeb3React();
  const toast: any = useToast();

  const requiresAuth = () => {
    if (account) {
      return;
    }

    toast?.pushError({
      title: "Error",
      message: "Please connect your wallet",
      lifetime: SHORT_TOAST_TIME,
    });
  };

  return {
    requiresAuth,
  };
};
