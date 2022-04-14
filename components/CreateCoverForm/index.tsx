import { ApproveTokenInput } from "@components/ApproveTokenInput";
import Divider from "@components/Divider";
import FormInput from "@components/FormInput";
import { MultiInputField } from "@components/MulitInputField";
import { RegularButton } from "@components/RegularButton";
import { TagsInput } from "@components/TagsInput";
import { TagsSelect } from "@components/TagsSelect";
import { VerticalTimeline } from "@components/VerticalTimeline";
import { Calculator } from "@svg";
import { useAppConstants } from "@utils/app-constants/context";
import { allNullItemsArray, isEmptyVariable } from "@utils/functions";
import { convertFromUnits } from "@utils/functions/bn";
import { useCreateCover } from "@utils/hooks/useCreateCover";
import { useTokenSymbol } from "@utils/hooks/useTokenSymbol";
import { formatCurrency } from "@utils/methods";
import Link from "next/link";
import { FC, FormEvent, useEffect, useState } from "react";

interface FormData {
  coverName: string;
  tags: string[];
  coverDescription: string;
  coverRules: string;
  coverExclusions: string;
  socialProfiles: string[];
  networkList: string[];
  floorRate: string;
  ceilingRate: string;
  reportingPeriod: string;
  cooldownPeriod: string;
  claimPeriod: string;
  minimumStake: string;
  resolutionResource: string[];
  npmStake: string;
  reassuranceAmount: string;
}

const BlockchainList = [
  "Ethereum",
  "BNB",
  "Solana",
  "Terra",
  "Cardano",
  "Avalanche",
  "Polkadot",
  "NEAR Protocol",
  "Polygon",
  "Chainlink",
  "TRON",
  "Ethereum Classic",
  "Algorand",
  "Stellar",
  "VeChain",
];

const initialFormData = {
  coverName: "",
  tags: [],
  coverDescription: "",
  coverRules: "",
  coverExclusions: "",
  socialProfiles: [""],
  networkList: [],
  floorRate: "",
  ceilingRate: "",
  reportingPeriod: "",
  cooldownPeriod: "",
  claimPeriod: "",
  minimumStake: "",
  resolutionResource: [""],
  npmStake: "",
  reassuranceAmount: "",
};

export const CreateCoverForm: FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [tokensApproved, setTokensApproved] = useState({
    npm: false,
    dai: false,
  });
  const [tosApproved, setTosApproved] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const {
    npmApproving,
    npmApproved,
    npmBalance,
    // npmBalanceLoading,

    reApproving,
    reApproved,
    reTokenBalance,
    // reTokenBalanceLoading,

    coverMinStake,
    error,

    handleReTokenApprove,
    handleNPMTokenApprove,
  } = useCreateCover({
    coverKey: "asds",
    reValue: formData.reassuranceAmount,
    npmValue: formData.npmStake,
  });

  const { NPMTokenAddress, liquidityTokenAddress } = useAppConstants();
  const liquidityTokenSymbol = useTokenSymbol(liquidityTokenAddress);
  const npmTokenSymbol = useTokenSymbol(NPMTokenAddress);

  const balance = {
    npm: formatCurrency(
      parseFloat(convertFromUnits(npmBalance).toString()),
      npmTokenSymbol,
      true
    ).short,
    dai: formatCurrency(
      parseFloat(convertFromUnits(reTokenBalance).toString()),
      liquidityTokenSymbol,
      true
    ).short,
    minStake: formatCurrency(
      parseFloat(convertFromUnits(coverMinStake).toString()),
      npmTokenSymbol,
      true
    ).short,
  };

  useEffect(() => {
    const {
      coverName,
      tags,
      coverDescription,
      coverRules,
      socialProfiles,
      networkList,
      floorRate,
      ceilingRate,
      reportingPeriod,
      cooldownPeriod,
      claimPeriod,
      minimumStake,
      resolutionResource,
      npmStake,
      reassuranceAmount,
    } = formData;
    if (
      isEmptyVariable(
        coverName,
        coverDescription,
        coverRules,
        floorRate,
        ceilingRate,
        reportingPeriod,
        cooldownPeriod,
        claimPeriod,
        minimumStake,
        npmStake,
        reassuranceAmount,
        tosApproved,
        npmApproved,
        reApproved
      )
    )
      return setSubmitDisabled(true);

    if (!tags.length || !networkList.length) return setSubmitDisabled(true);

    if (
      (socialProfiles.length && allNullItemsArray(socialProfiles)) ||
      (resolutionResource.length && allNullItemsArray(resolutionResource))
    )
      return setSubmitDisabled(true);

    setSubmitDisabled(false);
  }, [formData, tosApproved, npmApproved, reApproved]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (
    fieldName: keyof FormData,
    fieldValue: string | string[]
  ) => {
    // console.log({ fieldName, fieldValue });
    setFormData((val) => ({ ...val, [fieldName]: fieldValue }));

    enum ds {
      a,
      b,
      c,
      d,
      e,
    }
    console.log({ ds });
  };

  const period = {
    reporting: parseInt(formData.reportingPeriod || "0"),
    resolution:
      parseInt(formData.reportingPeriod || "0") +
      parseInt(formData.cooldownPeriod || "0"),
    claim:
      parseInt(formData.reportingPeriod || "0") +
      parseInt(formData.cooldownPeriod || "0") +
      parseInt(formData.claimPeriod || "0"),
  };

  return (
    <div className="max-w-screen-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <FormInput
            label="Cover name"
            placeholder="Enter your cover name" // max 31 characters
            value={formData.coverName}
            setValue={(val) => handleInputChange("coverName", val)}
            type="text"
          />

          <TagsInput
            label="Tags"
            value={formData.tags}
            setValue={(val) => handleInputChange("tags", val)}
            placeholder="Tags"
          />

          <FormInput
            label="Description"
            placeholder="Enter description of your project"
            value={formData.coverDescription}
            setValue={(val) => handleInputChange("coverDescription", val)}
            type="text"
            textfield
          />

          <TagsSelect
            itemList={BlockchainList}
            label="Blockchain Network List"
            value={formData.networkList}
            placeholder="Enter the list of blockchain networks your app supports."
            setValue={(val) => handleInputChange("networkList", val)}
          />

          <FormInput
            label="Cover Rules and Parameters"
            placeholder="Enter cover rules and parameters"
            value={formData.coverRules}
            setValue={(val) => handleInputChange("coverRules", val)}
            type="text"
            textfield
            inputClass="h-87"
          />

          <FormInput
            label="Cover Exclusions"
            placeholder="Enter cover exclusions"
            value={formData.coverExclusions}
            setValue={(val) => handleInputChange("coverExclusions", val)}
            type="text"
            textfield
            inputClass="h-87"
          />
        </div>

        <MultiInputField
          value={formData.socialProfiles}
          setValue={(val) => handleInputChange("socialProfiles", val)}
          label="Social Profiles"
          helpText="Press the (+) to add more."
          className="mt-12"
          placeholder={[
            "Enter website link",
            "Enter documentation link",
            "Enter telegram link",
            "Enter twitter link",
            "Enter github link",
            "Enter facebook link",
            "Enter blog link",
            "Enter discord link",
            "Enter linkedin link",
            "Enter slack link",
          ]}
          maxFields={10}
        />

        <Divider className="mt-12" />

        <div className="mt-10">
          <div className="flex items-center">
            <h2 className="font-semibold text-heading2 text-prim-blue">
              Fine Tune the Premium Pricing
            </h2>
            <Link href={"/calculator"} passHref>
              <a target={"_blank"}>
                <Calculator width="24" height="24" className="ml-2" />
              </a>
            </Link>
          </div>
          <div className="grid gap-8 mt-6 md:grid-cols-2">
            <FormInput
              label="Floor Rate"
              placeholder="0.00"
              value={formData.floorRate}
              setValue={(val) => handleInputChange("floorRate", val)}
              helpText="Enter the policy floor rate."
              numberFormat={false}
            />
            <FormInput
              label="Ceiling Rate"
              placeholder="0.00"
              value={formData.ceilingRate}
              setValue={(val) => handleInputChange("ceilingRate", val)}
              helpText="Enter the policy ceiling rate."
              numberFormat={false}
            />
          </div>
        </div>

        <Divider className="mt-10" />

        <div className="mt-10">
          <h2 className="font-semibold text-heading2 text-prim-blue">
            Configure Governance Parameters
          </h2>
          <div className="grid gap-8 mt-6 md:grid-cols-2">
            <FormInput
              label="Reporting Period"
              placeholder="No. of Days"
              value={formData.reportingPeriod}
              setValue={(val) => handleInputChange("reportingPeriod", val)}
              helpText="Min 7-day reporting period."
            />
            <FormInput
              label="Cooldown Period"
              placeholder="No. of Days"
              value={formData.cooldownPeriod}
              setValue={(val) => handleInputChange("cooldownPeriod", val)}
              helpText="Resolution can only be achieved after the cooldown period."
            />
            <FormInput
              label="Claim Period"
              placeholder="No. of Days"
              value={formData.claimPeriod}
              setValue={(val) => handleInputChange("claimPeriod", val)}
              helpText="Enter number of days during when people can claim."
            />
            <FormInput
              label="Minimum Reporting Stake"
              placeholder="0.00"
              value={formData.minimumStake}
              setValue={(val) => handleInputChange("minimumStake", val)}
              helpText="Minimum amount of NPM tokens required to report incident"
            />
          </div>
        </div>

        <Divider className="mt-12" />

        <div className="mt-10">
          <h2 className="font-semibold text-heading2 text-prim-blue">
            Reporting, Resolution, and Claim Period
          </h2>

          <VerticalTimeline
            items={[
              {
                innerLabel: "Day 0",
                name: "Start",
                periodInfo: "Reporting Period",
              },
              {
                innerLabel: `Day ${period.reporting}`,
                name: "Reporting End",
                periodInfo: "Cool down Period",
              },
              {
                innerLabel: `Day ${period.resolution}`,
                name: "Resolution End",
                periodInfo: "Claim Period",
              },
              {
                innerLabel: `Day ${period.claim}`,
                name: "Claim End",
              },
            ]}
            className="max-w-screen-md mt-10"
          />

          <MultiInputField
            value={formData.resolutionResource}
            setValue={(val) => handleInputChange("resolutionResource", val)}
            label="Resolution Resource"
            helpText="Press the (+) to add more."
            className="mt-20"
            placeholder="https://example.com/docs/123"
          />
        </div>

        <Divider className="mt-12" />

        <div className="mt-10">
          <h2 className="font-semibold text-heading2 text-prim-blue">
            {"Fee & Amount"}
          </h2>
          <ApproveTokenInput
            label="Npm Stake"
            placeholer="0.00"
            helpText={
              <span className="text-sm">
                Balance: {balance.npm}
                <br />
                Minimum Stake: {balance.minStake}
                {error.npm && (
                  <>
                    <br />
                    <span className="text-red-500">{error.npm}</span>
                  </>
                )}
              </span>
            }
            value={formData.npmStake}
            setValue={(val) => handleInputChange("npmStake", val)}
            tokenName="NPM"
            disabled={npmApproved || npmApproving || Boolean(error.npm)}
            handleCLick={() => handleNPMTokenApprove()}
            className="mt-6"
            btnText={
              npmApproved
                ? "Approved"
                : npmApproving
                ? "Approving NPM"
                : undefined
            }
          />
          <ApproveTokenInput
            label="Reassurance Amount"
            placeholer="0.00"
            helpText={
              <span className="text-sm">
                Balance: {balance.dai}
                {error.dai && (
                  <>
                    <br />
                    <span className="text-red-500">{error.dai}</span>
                  </>
                )}
              </span>
            }
            value={formData.reassuranceAmount}
            setValue={(val) => handleInputChange("reassuranceAmount", val)}
            tokenName="DAI"
            disabled={reApproved || reApproving || Boolean(error.dai)}
            handleCLick={() => handleReTokenApprove()}
            className="mt-12"
            btnText={
              reApproved
                ? "Approved"
                : reApproving
                ? "Approving DAI"
                : undefined
            }
          />
        </div>

        <div className="mt-18">
          <input
            type={"checkbox"}
            className="transform scale-125"
            id="tos-checkbox"
            checked={tosApproved}
            onChange={(e) => setTosApproved(e.target.checked)}
          />
          <label htmlFor="tos-checkbox" className="ml-2 font-poppins">
            I have read, understood, and agree to{" "}
            <a
              href="https://docs.neptunemutual.com/usage/terms-of-use"
              target={"_blank"}
              rel="noreferrer"
              className="underline"
            >
              the terms of service
            </a>
            .
          </label>
        </div>

        <RegularButton
          text="Create Cover"
          type="submit"
          className="mt-8"
          disabled={submitDisabled}
        />
      </form>
    </div>
  );
};
