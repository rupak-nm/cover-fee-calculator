import { useState, useEffect } from "react";
import { cover, registry } from "@neptunemutual/sdk";
import { useWeb3React } from "@web3-react/core";

import {
  convertToUnits,
  isGreater,
  isLessOrEqual,
  isLessThan,
} from "@utils/functions/bn";
import { getProviderOrSigner } from "@wallet/utils/web3";
import { useTxToast } from "./useTxToast";
import { useErrorNotifier } from "./useErrorNotifier";
import { useNetwork } from "@wallet/context/Network";
import { useAppConstants } from "@utils/app-constants/context";
// import { useInvokeMethod } from "./useInvokeMethod";
// import { useApprovalAmount } from "./useApprovalAmount";
import { getCoverMinStake } from "@utils/helpers/getCoverMinStake";
import { getCoverCreationFee } from "@utils/helpers/getCoverCreationFee";
import { useERC20Balance } from "./useERC20Balance";

import { convertFromUnits } from "@utils/functions/bn";
import { ICoverInfo } from "@neptunemutual/sdk/dist/types";

export const useCreateCover = ({
  reValue,
  npmValue,
}: {
  coverKey: string;
  reValue: string;
  npmValue: string;
}) => {
  const [reApproving, setReApproving] = useState(false);
  const [npmApproving, setNPMApproving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [reApproved, setReApproved] = useState<{
    curr?: string;
    prev?: string;
  }>({ curr: undefined, prev: undefined });
  const [npmApproved, setNPMApproved] = useState<{
    curr?: string;
    prev?: string;
  }>({ curr: undefined, prev: undefined });

  const [error, setError] = useState({ npm: "", dai: "" });

  const [coverMinStake, setCoverMinStake] = useState<any>("0");

  const { networkId } = useNetwork();
  const { library, account } = useWeb3React();

  const { liquidityTokenAddress, NPMTokenAddress } = useAppConstants();
  const {
    balance: reTokenBalance,
    loading: reTokenBalanceLoading,
    refetch: updateReTokenBalance,
  } = useERC20Balance(liquidityTokenAddress);
  const {
    balance: npmBalance,
    loading: npmBalanceLoading,
    refetch: updateNpmBalance,
  } = useERC20Balance(NPMTokenAddress);

  const txToast = useTxToast();
  // const { invoke } = useInvokeMethod();
  const { notifyError } = useErrorNotifier();

  useEffect(() => {
    async function setMinValue() {
      try {
        const signerOrProvider = getProviderOrSigner(
          library,
          account ?? undefined,
          networkId
        );

        if (signerOrProvider?.provider) {
          const val = await getCoverMinStake(
            networkId,
            signerOrProvider.provider
          );
          setCoverMinStake(val);
        }
      } catch {}
    }
    setMinValue();
  }, [library, account, networkId]);

  useEffect(() => {
    const _npmError = isLessOrEqual(convertFromUnits(npmBalance), 0)
      ? "Balance not available"
      : isGreater(npmValue, convertFromUnits(npmBalance).toString())
      ? "Amount greater than balance"
      : isLessThan(npmValue, convertFromUnits(coverMinStake).toString())
      ? "Amount less than minimum stake"
      : isLessThan(
          convertFromUnits(npmBalance).toString(),
          convertFromUnits(coverMinStake).toString()
        )
      ? "Balance less than minimum stake"
      : "";

    const _daiError = isLessOrEqual(convertFromUnits(reTokenBalance), 0)
      ? "Balance not available"
      : isGreater(reValue, convertFromUnits(reTokenBalance).toString())
      ? "Amount greater than balance"
      : "";

    setError({ npm: _npmError, dai: _daiError });
  }, [npmValue, npmBalance, reTokenBalance, reValue, coverMinStake]);

  useEffect(() => {
    if (npmApproved.prev && isLessThan(npmApproved.prev, npmValue))
      setNPMApproved((v) => ({ ...v, curr: undefined }));
    else setNPMApproved((v) => ({ curr: v.prev, prev: v.prev }));
    if (reApproved.prev && isLessThan(reApproved.prev, reValue))
      setReApproved((v) => ({ ...v, curr: undefined }));
    else setReApproved((v) => ({ curr: v.prev, prev: v.prev }));
  }, [npmValue, reValue]);

  const handleReTokenApprove = async () => {
    setReApproving(true);

    const cleanup = () => {
      setReApproving(false);
    };

    const handleError = (err: any) => {
      notifyError(err, "approve DAI");
    };

    const onTransactionResult = async (tx: any) => {
      try {
        await txToast.push(tx, {
          pending: "Approving NPM",
          success: "Approved NPM Successfully",
          failure: "Could not approve NPM",
        });
        cleanup();
        setReApproved({ curr: reValue, prev: reValue });
      } catch (err) {
        handleError(err);
        cleanup();
      }
    };

    try {
      const signerOrProvider = getProviderOrSigner(
        library,
        account ?? undefined,
        networkId
      );

      const reAmount = convertToUnits(reValue).toString();
      const spender = await registry.Staking.getAddress(
        networkId,
        signerOrProvider
      );
      const tx = await cover.approveReassurance(
        networkId,
        liquidityTokenAddress,
        { amount: reAmount, spender },
        signerOrProvider
      );

      onTransactionResult(tx.result);
    } catch (err) {
      cleanup();
      handleError(err);
    }
  };

  const handleNPMTokenApprove = async () => {
    setNPMApproving(true);

    const cleanup = () => {
      setNPMApproving(false);
    };
    const handleError = (err: any) => {
      notifyError(err, "approve NPM");
    };

    const onTransactionResult = async (tx: any) => {
      try {
        await txToast.push(tx, {
          pending: "Approving NPM",
          success: "Approved NPM Successfully",
          failure: "Could not approve NPM",
        });
        cleanup();
        setNPMApproved({ curr: npmValue, prev: npmValue });
      } catch (err) {
        handleError(err);
        cleanup();
      }
    };

    try {
      const signerOrProvider = getProviderOrSigner(
        library,
        account ?? undefined,
        networkId
      );

      const npmAmount = convertToUnits(npmValue).toString();
      const spender = await registry.Staking.getAddress(
        networkId,
        signerOrProvider
      );
      const tx = await cover.approveStakeAndFees(
        networkId,
        { amount: npmAmount, spender },
        signerOrProvider
      );

      onTransactionResult(tx.result);
    } catch (err) {
      cleanup();
      handleError(err);
    }
  };

  const handleCreateCover = async (coverInfo: ICoverInfo) => {
    setCreating(true);

    const cleanup = () => {
      setCreating(false);
    };
    const handleError = (err: any) => {
      notifyError(err, "create cover");
    };

    const onTransactionResult = async (tx: any) => {
      try {
        await txToast.push(tx, {
          pending: "Creating Cover",
          success: "Created Cover Successfully",
          failure: "Could not create cover",
        });
        cleanup();
      } catch (err) {
        handleError(err);
        cleanup();
      }
    };

    try {
      const signerOrProvider = getProviderOrSigner(
        library,
        account ?? undefined,
        networkId
      );

      const tx = await cover.createCover(
        networkId,
        coverInfo,
        signerOrProvider
      );

      onTransactionResult(tx.result);
    } catch (err) {
      cleanup();
      handleError(err);
    }
  };

  return {
    npmApproving,
    npmApproved: Boolean(npmApproved.curr),
    npmBalance,
    npmBalanceLoading,
    updateNpmBalance,

    reApproving,
    reApproved: Boolean(reApproved.curr),
    reTokenBalance,
    reTokenBalanceLoading,
    updateReTokenBalance,

    error,
    coverMinStake,

    handleReTokenApprove,
    handleNPMTokenApprove,
    handleCreateCover,
  };
};
