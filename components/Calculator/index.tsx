import Divider from "@components/Divider";
import InfoText from "@components/InfoText";
import InputField from "@components/InputField";
import Select from "@components/Select";
import {
  castToNumber,
  getLocaleNumber,
  getPlainNumber,
  isKeyEmpty,
} from "@utils/formatting";
import { formatPercent, getCoverFee } from "@utils/methods";
import { useData } from "lib/chart/useData";
import { useEffect, useState } from "react";

const Calculator = () => {
  const options = [
    { name: "Select a Duration", value: "" },
    { name: "1 month", value: "1" },
    { name: "2 months", value: "2" },
    { name: "3 months", value: "3" },
  ];

  const { data, setData } = useData();

  const [formData, setFormData] = useState({
    vaultAmount: data.inVault,
    supportPoolAmount: data.reassuranceAmount,
    commitments: data.totalCommitment,
    floor: data.floor ? (parseFloat(data.floor) * 100).toString() : "",
    ceiling: data.ceiling ? (parseFloat(data.ceiling) * 100).toString() : "",
    coverAmount: data.coverAmount,
    coverDuration: data.duration,
  });

  const handleChange = (field: string, value: string) => {
    if (formData[field as keyof typeof formData] === value) return;

    let _newValue = value;
    if (field === "coverDuration") {
      _newValue = options.find((opt) => opt.value === value)?.value ?? "";
    }
    setFormData((val) => ({ ...val, [field]: _newValue }));
  };

  useEffect(() => {
    // let fieldEmpty = false;
    // for (const key in formData) {
    //   if (formData[key as keyof typeof formData] === "") {
    //     fieldEmpty = true;
    //     break;
    //   }
    // }
    // if (fieldEmpty) return;
    setData({
      inVault: getPlainNumber(formData["vaultAmount"]),
      reassuranceAmount: getPlainNumber(formData["supportPoolAmount"]),
      totalCommitment: getPlainNumber(formData["commitments"]),
      floor: formData["floor"]
        ? getPlainNumber(parseFloat(formData["floor"]) / 100)
        : "",
      ceiling: formData["ceiling"]
        ? getPlainNumber(parseFloat(formData["ceiling"]) / 100)
        : "",
      coverAmount: getPlainNumber(formData["coverAmount"]),
      duration: getPlainNumber(formData["coverDuration"]),
      provision: "1000000",
    });
  }, [formData]);

  const getStats: any = () => {
    let availableLiquidity, utilizationRatio, coverRate, coverFee;

    // availableLiquidity & utilizationRatio
    if (data.inVault && data.reassuranceAmount) {
      availableLiquidity =
        parseFloat(data.inVault) + parseFloat(data.reassuranceAmount) * 0.25;

      if (data.totalCommitment) {
        utilizationRatio = formatPercent(
          parseFloat(data.totalCommitment) / availableLiquidity
        );
      }

      availableLiquidity = getLocaleNumber(availableLiquidity.toFixed(3));
    }

    if (
      !isKeyEmpty(data, [
        "reassuranceAmount",
        "provision",
        "inVault",
        "coverAmount",
        "totalCommitment",
        "floor",
        "ceiling",
        "duration",
      ])
    ) {
      const c: any = castToNumber(data);
      try {
        const _data = getCoverFee({
          amount: c.coverAmount,
          ...c,
        });

        coverRate = formatPercent(_data.rate.toString());
        coverFee = _data.projectedFee.toFixed(2);
      } catch (err) {
        // console.log({ err });
      }
    }
    return {
      availableLiquidity,
      utilizationRatio,
      coverRate,
      coverFee,
    };
  };

  const { availableLiquidity, utilizationRatio, coverRate, coverFee } =
    getStats();

  return (
    <div className="px-4 py-12 sm:px-7 lg:px-20 sm:py-10 lg:pt-8 lg:pb-12 bg-prim-gray font-poppins">
      <h1 className="hidden text-xl font-bold lg:block">
        Cover Fee Calculator
      </h1>
      <div className="grid grid-cols-2 gap-2 lg:mt-8 ">
        <div className="">
          <InfoText
            label="Available Liquidity"
            text={availableLiquidity ? `$${availableLiquidity}` : <i>N/A</i>}
          />
        </div>
        <div className="">
          <InfoText
            label="Utilization Ratio"
            text={utilizationRatio ? `${utilizationRatio}` : <i>N/A</i>}
          />
        </div>
      </div>
      <Divider className="mt-6" />
      <div className="mt-6">
        <h1 className="text-xl">Customize Liquidity</h1>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <InputField
            label="Amount in Valut"
            placeholder="$30,000,000"
            value={formData["vaultAmount"]}
            setValue={(val) => handleChange("vaultAmount", val)}
            prefix="$"
          />
          <InputField
            label="Amount in Support Pool"
            placeholder="$2,000,000"
            value={formData["supportPoolAmount"]}
            setValue={(val) => handleChange("supportPoolAmount", val)}
            prefix="$"
          />
          <InputField
            label="Commitments"
            placeholder="$1,000,000"
            value={formData["commitments"]}
            setValue={(val) => handleChange("commitments", val)}
            prefix="$"
          />
        </div>
      </div>
      <Divider className="mt-6" />
      <div className="mt-6">
        <h1 className="text-xl">Customize Pricing</h1>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <InputField
            label="Floor"
            placeholder="2.5%"
            value={formData["floor"]}
            setValue={(val) => handleChange("floor", val)}
            suffix="%"
            numberFormat={false}
          />
          <InputField
            label="Ceiling"
            placeholder="25%"
            value={formData["ceiling"]}
            setValue={(val) => handleChange("ceiling", val)}
            suffix="%"
            numberFormat={false}
          />
        </div>
      </div>
      {/* Price calculator */}
      <Divider className="mt-6" />
      <div className="mt-6">
        <h1 className="text-xl">Price Calculator</h1>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <InputField
            label="Cover Amount"
            placeholder="Enter Amount"
            value={formData["coverAmount"]}
            setValue={(val) => handleChange("coverAmount", val)}
            prefix="$"
          />
          <Select
            label="Cover Duration"
            selected={formData["coverDuration"]}
            onChange={(val) => handleChange("coverDuration", val)}
            options={options}
          />
        </div>
      </div>
      <Divider className="mt-6" />
      <div className="mt-6">
        <h2 className="text-xs font-semibold text-prim-blue">
          {"YOUR COVER RATE & FEE"}
        </h2>
        <h1 className="mt-2 text-2xl font-bold text-text-prim">
          {coverRate ? `${coverRate}` : <i>N/A</i>} /{" "}
          {coverFee ? `${coverFee} DAI` : <i>N/A</i>}
        </h1>
      </div>
    </div>
  );
};

export default Calculator;
