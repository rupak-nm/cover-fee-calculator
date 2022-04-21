import { getCoverImgSrc } from "@utils/helpers/cover";
import { formatCurrency } from "@utils/methods";
import { convertFromUnits, toBN } from "@utils/functions/bn";
import { formatPercent } from "@utils/methods";
import { MULTIPLIER } from "@config/constants";
import { useMyLiquidityInfo } from "@utils/hooks/useMyLiquidityInfo";
import { useCommitment } from "@utils/hooks/useCommitment";
import Divider from "@components/Divider";
import { useCoverInfo } from "@utils/hooks/useCoverInfo";
import Image from "next/image";
import { ProgressBar } from "@components/Progessbar";

export const CoverCard = ({
  details,
}: {
  details: { projectName: string; key: string; ipfsData: any };
}) => {
  const { projectName, key, ipfsData } = details;
  const { coverInfo } = useCoverInfo(key);
  const { info: liquidityInfo } = useMyLiquidityInfo({ coverKey: key });
  const { commitment } = useCommitment({ coverKey: key });
  const imgSrc = getCoverImgSrc(coverInfo);

  const liquidity = liquidityInfo.totalLiquidity;
  const protection = commitment;
  const utilization = toBN(liquidity).isEqualTo(0)
    ? "0"
    : toBN(protection).dividedBy(liquidity).decimalPlaces(2).toString();

  const stats = {
    coverFee: {
      from: formatPercent(ipfsData.pricingFloor / MULTIPLIER),
      to: formatPercent(ipfsData.pricingCeiling / MULTIPLIER),
    },
    protection: {
      long: formatCurrency(parseFloat(convertFromUnits(commitment).toString()))
        .long,
      short: formatCurrency(parseFloat(convertFromUnits(commitment).toString()))
        .short,
    },
    liquidity: {
      long: formatCurrency(parseFloat(convertFromUnits(liquidity).toString()))
        .long,
      short: formatCurrency(parseFloat(convertFromUnits(liquidity).toString()))
        .short,
    },
  };

  return (
    <div className="p-6 bg-white border-2 border-border-gray rounded-3xl">
      <div className="flex items-start justify-between">
        <div className="relative">
          <Image
            layout="intrinsic"
            width={72}
            height={72}
            src={imgSrc}
            alt={projectName}
            className="inline-block max-w-full w-14 lg:w-18"
          />
        </div>
      </div>

      <h4 className="mt-4 font-semibold uppercase text-h4 font-poppins">
        {projectName}
      </h4>
      <div className="mt-1 uppercase text-h7 lg:text-sm text-[#7398C0] lg:mt-2">
        Cover fee: {stats.coverFee.from}-{stats.coverFee.to}
      </div>

      {/* Divider */}
      <Divider className="mt-4 mb-8" />

      {/* Stats */}
      <div className="flex justify-between px-1 text-h7 lg:text-sm">
        <span className="uppercase text-h7 lg:text-sm">utilization Ratio</span>
        <span className="font-semibold text-right text-h7 lg:text-sm ">
          {formatPercent(parseFloat(utilization))}
        </span>
      </div>
      <div className="mt-2 mb-4">
        <ProgressBar value={utilization} />
      </div>
      <div className="flex flex-row justify-between gap-1 px-1 md:flex-col xl:flex-row text-h7 lg:text-sm">
        <div className="flex-1" title={stats.protection.long}>
          Protection: {stats.protection.short}
        </div>

        <div
          className="flex-1 text-right md:text-left xl:text-right"
          title={stats.liquidity.long}
        >
          Liquidity: {stats.liquidity.short}
        </div>
      </div>
    </div>
  );
};
