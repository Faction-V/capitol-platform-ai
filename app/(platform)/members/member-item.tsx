import { useState } from "react";
import { TrashIcon } from "@/app/icons/trash-icon";
import { Button } from "@/app/components/button";
import { Member } from "../../types";
import { DeleteConfirmationModal } from "../../components/delete-confirmation-modal";
import { toast } from "react-toastify";
import { removeMember } from "./services/remove-member";
import { isEmptyString } from "../../utils/is-empty-string";
import { colors } from "../../components/colors";

interface MemberItemProps extends Member {
  isOwner: boolean | undefined;
  updateMembersAfterRemove: (id: string) => void;
}

export const MemberItem = ({
  isOwner,
  fullName,
  role,
  email,
  id,
  updateMembersAfterRemove,
}: MemberItemProps) => {
  const name = isEmptyString(fullName.trim()) ? "Unknown name" : fullName;

  const [firstName, lastName] = name.trim().split(/\s+/);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const colorClassname = colors[lastName[0].toLowerCase()];

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await removeMember({ id });
      updateMembersAfterRemove(id);
      toast.success("Member was removed from organization successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove member");
    }
    setIsLoading(false);
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
      <div className="flex gap-3">
        <div
          className={`w-10 h-10 rounded-full ${colorClassname} flex items-center justify-center self-center`}
        >
          {firstName[0].toUpperCase()}
          {lastName[0].toUpperCase()}
        </div>
        <div className="flex flex-col justify-between leading-normal">
          <h5 className="font-bold tracking-tight text-gray-900">
            {firstName} {lastName}
          </h5>
          <p className="font-normal text-gray-700 underline">{email}</p>
          <p className="font-normal text-sm text-gray-700">{role}</p>
        </div>
      </div>
      {isOwner && role !== "owner" && (
        <div className="flex items-start">
          <Button
            label={<TrashIcon />}
            type="secondary"
            onClick={() => {
              setIsConfirmationModalOpen(true);
            }}
          />
        </div>
      )}

      {isConfirmationModalOpen && (
        <DeleteConfirmationModal
          isLoading={isLoading}
          title="Remove member from organization"
          description="Are you sure you want to remove this member from the organization?"
          buttonLabel="Remove member"
          handleDelete={handleDelete}
          handleCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
};
