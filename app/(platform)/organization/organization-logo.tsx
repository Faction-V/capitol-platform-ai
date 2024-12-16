"use client";

import { useState } from "react";

import { Dropzone } from "../../components/dropzone";
import { Button } from "../../components/button";
import { EditIcon } from "../../icons/edit-icon";
import { User } from "../../types";
import { useUser } from "../UserProvider";

interface OrganizationLogoProps {
  logoUrl: string;
}

export const OrganizationLogo = ({ logoUrl }: OrganizationLogoProps) => {
  const user: User | undefined = useUser();
  const [isEditMode, setIsEditMode] = useState(false);
  const [image, setImage] = useState<string>(logoUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = (imageUrl: string) => {
    setImage(imageUrl);
    setIsEditMode(false);
  };

  return (
    <div className="flex gap-2 flex-col bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
      <div className="flex justify-between w-full">
        <div className="text-gray-900">Organization logo</div>
        {user?.isOwner && (
          <Button
            isLoading={isLoading}
            label={<EditIcon size={16} />}
            onClick={() => setIsEditMode(true)}
            type="secondary"
          />
        )}
      </div>
      {isEditMode ? (
        <Dropzone handleUpload={handleUpload} setIsLoading={setIsLoading} />
      ) : (
        <img src={image} alt="" className="h-10 w-10 object-cover rounded-md" />
      )}
    </div>
  );
};
