"use client";

import { Select } from "../../components/select";
import { useState } from "react";
import { Button } from "../../components/button";

interface OrgModel {
  label: string;
  value: string;
}

interface OrganizationModelsProps {
  models: Array<OrgModel>;
}

export const OrganizationModels = ({ models }: OrganizationModelsProps) => {
  const [primaryModel, setPrimaryModel] = useState<string>("");
  const [secondaryModel, setSecondaryModel] = useState<string>("");

  return (
    <div className="flex gap-2 flex-col bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
      <div className="flex justify-between w-full">
        <div className="text-gray-900">Organization models</div>
        <Button
          label="Save"
          onClick={() => {
            console.log("save");
          }}
        />
      </div>
      <div className="flex justify-between w-full font-semibold gap-4">
        <Select
          header="Primary model"
          items={models}
          selected={primaryModel}
          keyPrefix="primary"
          onClick={(value: string) => setPrimaryModel(value)}
        />
        <Select
          header="Secondary model"
          items={models}
          selected={secondaryModel}
          keyPrefix="secondary"
          onClick={(value: string) => setSecondaryModel(value)}
        />
      </div>
    </div>
  );
};
