"use client";

import { useState } from "react";

import { Dropzone } from "../../components/dropzone";
import { Button } from "../../components/button";
import { EditIcon } from "../../icons/edit-icon";

export const OrganizationLogo = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="flex gap-2 flex-col bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
      <div className="flex justify-between w-full">
        <div className="text-gray-900">Organization logo</div>
        <Button
          label={<EditIcon size={16} />}
          onClick={() => setIsEditMode(true)}
          type="secondary"
        />
      </div>
      {isEditMode ? <Dropzone /> : "image"}
    </div>
  );
};
