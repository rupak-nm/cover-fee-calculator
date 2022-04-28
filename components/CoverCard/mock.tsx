import { getCoverImgSrc } from "@utils/helpers/cover";
import { formatCurrency } from "@utils/methods";
import { formatPercent } from "@utils/methods";
import Divider from "@components/Divider";
import Image from "next/image";
import { ProgressBar } from "@components/Progessbar";

export const CoverCard = ({
  details,
}: {
  details: { projectName: string; key: string; ipfsData: any };
}) => {
  const { projectName, key } = details;
  const imgSrc = getCoverImgSrc({ key });
  const utilization = "0.25";

  const stats = {
    coverFee: {
      from: formatPercent(0.12),
      to: formatPercent(0.45),
    },
    protection: {
      long: formatCurrency(23423434).long,
      short: formatCurrency(2343545).short,
    },
    liquidity: {
      long: formatCurrency(546232434).long,
      short: formatCurrency(2938472394).short,
    },
    totalUsers: 200,
    reassurance: {
      short: formatCurrency(5260000).short,
      long: formatCurrency(5260000).long,
    },
  };

  return (
    <div className="p-6 bg-white border border-divider-gray rounded-3xl font-poppins">
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

      <h4 className="mt-4 font-semibold uppercase text-h4 font-sora">
        {projectName}
      </h4>

      {/* Cover Fee stats */}
      <div className="mt-1 uppercase text-h7 text-7398C0 lg:mt-2">
        Cover fee: {stats.coverFee.from}-{stats.coverFee.to}
      </div>

      {/* Divider */}
      <Divider className="mt-4 mb-8" />

      {/* Utilization Ratio */}
      <div className="flex justify-between px-1 text-h7 ">
        <span className="uppercase text-h7 ">utilization Ratio</span>
        <span className="font-semibold text-right text-h7 ">
          {formatPercent(parseFloat(utilization))}
        </span>
      </div>

      {/* Utilization Ratio Progessbar */}
      <div className="mt-2 mb-4">
        <ProgressBar value={utilization} />
      </div>

      {/* Protection & Liquidity stats */}
      <div className="flex flex-row justify-between gap-1 px-1 md:flex-col xl:flex-row text-h7 ">
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

      {/* Total Users & Reassurance stats */}
      <div className="flex flex-row justify-between gap-1 px-1 mt-4 md:flex-col xl:flex-row text-h7 ">
        <div className="flex-1">Total Users: {stats.totalUsers}</div>

        <div
          className="flex-1 text-right md:text-left xl:text-right"
          title={stats.reassurance.long}
        >
          Reassurance: {stats.reassurance.short}
        </div>
      </div>
    </div>
  );
};
