"use client";

import { KeyboardEvent, useState } from "react";
import { Input } from "../../components/input";
import { EditIcon } from "../../icons/edit-icon";
import { Button } from "../../components/button";
import { isEmptyString } from "../../utils/is-empty-string";
import { updateOrgName } from "./services/update-org-name";

interface OrganizationNameProps {
  orgName: string;
}

export const OrganizationName = ({ orgName }: OrganizationNameProps) => {
  const [name, setName] = useState(orgName);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveName = async () => {
    const trimmedName = name.trim();

    if (isEmptyString(trimmedName)) {
      return;
    }

    setIsLoading(true);
    try {
      await updateOrgName({ name: trimmedName });
    } catch (error) {
      console.error(error);
    }
    setIsEditMode(false);
    setIsLoading(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSaveName();
    }
  };

  return (
    <div className="flex gap-2 flex-col bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
      <div className="flex justify-between w-full">
        <div className="text-gray-900">Organization name</div>
        <Button
          label={<EditIcon size={16} />}
          onClick={() => setIsEditMode(true)}
          type="secondary"
        />
      </div>
      {isEditMode ? (
        <div className="flex justify-between w-full">
          <Input
            onChange={(value: string) => {
              setName(value);
            }}
            onKeyDown={handleKeyDown}
            value={name}
            customClassName="max-w-80"
          />
          <div className="flex gap-1.5">
            <Button
              isLoading={isLoading}
              label="Save"
              onClick={handleSaveName}
            />
            <Button
              label="Cancel"
              onClick={() => {
                setIsEditMode(false);
              }}
              type="secondary"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-full font-semibold">{name}</div>
      )}
    </div>
  );
};
