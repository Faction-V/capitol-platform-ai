"use client";

import { useState } from "react";
import { Input } from "../../components/input";
import { EditIcon } from "../../icons/edit-icon";
import { Button } from "../../components/button";
import { isEmptyString } from "../../utils/is-empty-string";
import { updateOrgName } from "./serveces/update-org-name";

export const OrganizationName = () => {
  const [name, setName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSaveName = async () => {
    const trimmedName = name.trim();

    if (isEmptyString(trimmedName)) {
      return;
    }

    try {
      await updateOrgName({ name: trimmedName });
    } catch (error) {
      console.error(error);
    }

    setIsEditMode(false);
  };

  return (
    <div className="flex gap-2 flex-col bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
      <div className="text-gray-900">Organisation name</div>
      {isEditMode ? (
        <div className="flex justify-between w-full">
          <Input
            onChange={(value: string) => {
              setName(value);
            }}
            onKeyDown={() => {}}
            value={name}
            customClassName="max-w-80"
          />
          <div className="flex gap-1.5">
            <Button label="Save" onClick={handleSaveName} />
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
        <div className="flex justify-between w-full">
          <div className="font-semibold">{name}</div>
          <Button
            label={<EditIcon size={16} />}
            onClick={() => setIsEditMode(true)}
            type="secondary"
          />
        </div>
      )}
    </div>
  );
};
