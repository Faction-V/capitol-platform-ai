"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../components/button";
import { Organization } from "../../types";
import { CapitolIcon } from "../../icons/capitol-icon";

interface OrganizationItemProps extends Organization {
  handleOpenMemberModal: (id: string) => void;
}

export const OrganizationItem = ({
  id,
  name,
  imageUrl,
  handleOpenMemberModal,
}: OrganizationItemProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg shadow mb-2 overflow-hidden py-3 px-3">
      <div className="flex gap-3 items-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Org logo"
            className="h-10 w-10 object-cover rounded-md"
          />
        ) : (
          <CapitolIcon />
        )}
        <div className="font-semibold">{name}</div>
      </div>
      <div className="flex gap-2">
        <Button
          label="Add member"
          onClick={() => {
            handleOpenMemberModal(id);
          }}
        />
        <Button
          type="secondary"
          label="Edit org"
          onClick={() => router.push(`/members/${id}`)}
        />
      </div>
    </div>
  );
};
