import { useUnlimitedApproval } from "@wallet/context/UnlimitedApproval";
import { MaxUint256 } from "@ethersproject/constants";

export const useApprovalAmount = () => {
  const { unlimitedApproval } = useUnlimitedApproval();

  /**
   * @param {string} amount
   */
  const getApprovalAmount = (amount: string) => {
    if (unlimitedApproval) {
      return MaxUint256.toString();
    }

    return amount;
  };

  return {
    getApprovalAmount,
  };
};
