import { ApproveTokenInput } from "@components/ApproveTokenInput";
import Divider from "@components/Divider";
import FormInput from "@components/FormInput";
import { MultiInputField } from "@components/MulitInputField";
import { RegularButton } from "@components/RegularButton";
import { TagsInput } from "@components/TagsInput";
import { VerticalTimeline } from "@components/VerticalTimeline";
import { FC, FormEvent, useState } from "react";

export const CreateCoverForm: FC = () => {
  const [formData, setFormData] = useState({
    coverName: "",
    tags: [],
    coverDescription: "",
    coverRules: "",
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
  });

  const [tokensApproved, setTokensApproved] = useState({
    npm: false,
    dai: false,
  });
  const [tosApproved, setTosApproved] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (
    fieldName: string,
    fieldValue: string | string[]
  ) => {
    // console.log({ fieldName, fieldValue });
    setFormData((val) => ({ ...val, [fieldName]: fieldValue }));
  };

  const handleTokenApproval = (tokenName: string, approved: boolean) => {
    setTokensApproved((val) => ({ ...val, [tokenName]: approved }));
  };

  return (
    <div className="max-w-screen-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <FormInput
            label="Cover name"
            placeholder="Enter your cover name"
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

          <TagsInput
            label="Blockchain Network List"
            value={formData.networkList}
            placeholder="Enter the list of blockchain networks your app supports."
            setValue={(val) => handleInputChange("networkList", val)}
            helpText={"Enter a comma (,) after each item."}
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
        </div>

        <MultiInputField
          value={formData.socialProfiles}
          setValue={(val) => handleInputChange("socialProfiles", val)}
          label="Social Profiles"
          helpText="Press the (+) to add more."
          className="mt-12"
          placeholder="https://twitter.com/profile_url"
        />

        <Divider className="mt-12" />

        <div className="mt-10">
          <h2 className="font-semibold text-heading2 text-prim-blue">
            Fine Tune the Premium Pricing
          </h2>
          <div className="grid gap-8 mt-6 md:grid-cols-2">
            <FormInput
              label="Floor Rate"
              placeholder="0.00"
              value={formData.floorRate}
              setValue={(val) => handleInputChange("floorRate", val)}
              helpText="Enter the policy floor rate."
            />
            <FormInput
              label="Ceiling Rate"
              placeholder="0.00"
              value={formData.ceilingRate}
              setValue={(val) => handleInputChange("ceilingRate", val)}
              helpText="Enter the policy ceiling rate."
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
                innerLabel: `Day ${formData.reportingPeriod || "0"}`,
                name: "reporting",
              },
              {
                innerLabel: `Day ${formData.claimPeriod || "0"}`,
                name: "claim",
              },
              {
                innerLabel: `Day ${formData.cooldownPeriod || "0"}`,
                name: "resolution",
              },
            ]}
            className="max-w-screen-sm mt-10"
          />

          <MultiInputField
            value={formData.resolutionResource}
            setValue={(val) => handleInputChange("resolutionResource", val)}
            label="Resolution Resource"
            helpText="Press the (+) to add more."
            className="mt-18"
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
            helpText="Enter NPM token stake. 1,000 NPM Fee. Min: 5,000 NPM."
            value={formData.npmStake}
            setValue={(val) => handleInputChange("npmStake", val)}
            tokenName="NPM"
            approved={tokensApproved.npm}
            onApproved={(isApproved) => handleTokenApproval("npm", isApproved)}
            className="mt-6"
          />
          <ApproveTokenInput
            label="Reassurance Amount"
            placeholer="0.00"
            helpText="Enter NPM token stake. 1,000 NPM Fee. Min: 5,000 NPM."
            value={formData.reassuranceAmount}
            setValue={(val) => handleInputChange("reassuranceAmount", val)}
            tokenName="DAI"
            approved={tokensApproved.dai}
            onApproved={(isApproved) => handleTokenApproval("dai", isApproved)}
            className="mt-12"
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

        <RegularButton text="Create Cover" type="submit" className="mt-8" />
      </form>
    </div>
  );
};
