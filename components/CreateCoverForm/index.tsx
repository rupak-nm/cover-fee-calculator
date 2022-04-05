import FormInput from "@components/FormInput";
import { MultiInputField } from "@components/MulitInputField";
import { FC, FormEvent, useState } from "react";

export const CreateCoverForm: FC = () => {
  const [formData, setFormData] = useState({
    coverName: "",
    coverDescription: "",
    socialProfiles: [""],
    // supportPoolAmount: data.reassuranceAmount,
    // commitments: data.totalCommitment,
    // floor: data.floor ? (parseFloat(data.floor) * 100).toString() : "",
    // ceiling: data.ceiling ? (parseFloat(data.ceiling) * 100).toString() : "",
    // coverAmount: data.coverAmount,
    // coverDuration: data.duration,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (
    fieldName: string,
    fieldValue: string | string[]
  ) => {
    console.log({ fieldName, fieldValue });
    setFormData((val) => ({ ...val, [fieldName]: fieldValue }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <FormInput
          label="Cover name"
          placeholder="Enter your cover name"
          value={formData.coverName}
          setValue={(val) => handleInputChange("coverName", val)}
          type="text"
        />
        <FormInput
          label="Description"
          placeholder="Enter description of your project"
          value={formData.coverName}
          setValue={(val) => handleInputChange("coverDescription", val)}
          type="text"
          textfield
        />
        <FormInput
          label="Cover Rules and Parameters"
          placeholder="Enter cover rules and parameters"
          value={formData.coverName}
          setValue={(val) => handleInputChange("coverDescription", val)}
          type="text"
          textfield
          inputClass="h-87"
        />
        <MultiInputField
          value={formData.socialProfiles}
          setValue={(val) => handleInputChange("socialProfiles", val)}
          label="Social Profiles"
          helpText="Press the (+) to add more."
        />
      </form>
    </div>
  );
};
