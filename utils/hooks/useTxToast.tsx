import { ViewTxLink } from "@components/common/ViewTxLink";
import { getTxLink } from "@wallet/utils/explorer";
import { useToast } from "@toast/context";
import { TOAST_DEFAULT_TIMEOUT } from "@config/toast";
import { useNetwork } from "@wallet/context/Network";

export const useTxToast = () => {
  const { networkId } = useNetwork();
  const toast: any = useToast();

  /**
   *
   * @param {*} tx
   * @param {{pending: string, success: string, failure: string}} titles
   * @param {{onTxSuccess: function, onTxFailure: function}} options
   */
  const push = async (tx: any, titles: any, options: any = {}) => {
    if (!tx) {
      options?.onTxFailure && options.onTxFailure();
      return;
    }

    const txLink = getTxLink(networkId, tx);

    toast?.pushLoading({
      title: titles.pending,
      message: <ViewTxLink txLink={txLink} />,
      lifetime: TOAST_DEFAULT_TIMEOUT,
    });

    const receipt = await tx?.wait(1);
    const type = receipt.status === 1 ? "Success" : "Error";

    if (type === "Success") {
      toast?.pushSuccess({
        title: titles.success,
        message: <ViewTxLink txLink={txLink} />,
        lifetime: TOAST_DEFAULT_TIMEOUT,
      });

      options?.onTxSuccess && options.onTxSuccess();
      return;
    }

    toast?.pushError({
      title: titles.failure,
      message: <ViewTxLink txLink={txLink} />,
      lifetime: TOAST_DEFAULT_TIMEOUT,
    });

    options?.onTxFailure && options.onTxFailure();
  };

  return { push };
};
