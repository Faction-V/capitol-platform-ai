"use client";

import { useState } from "react";

import { Dropzone } from "../../components/dropzone";
import { Button } from "../../components/button";
import { EditIcon } from "../../icons/edit-icon";

interface OrganizationLogoProps {
  logoUrl: string;
}

export const OrganizationLogo = ({ logoUrl }: OrganizationLogoProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [image, setImage] = useState<string>(logoUrl);

  const handleUpload = (imageUrl: string) => {
    setImage(imageUrl);
    setIsEditMode(false);
  };

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
      {isEditMode ? (
        <Dropzone handleUpload={handleUpload} />
      ) : (
        <img src={image} alt="" className="h-10 w-10 object-cover rounded-md" />
      )}
    </div>
  );
};
