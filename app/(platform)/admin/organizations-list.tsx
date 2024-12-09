"use client";

import { Button } from "../../components/button";
import { CreateOrganizationModal } from "./create-organization-modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { createOrganization } from "./services/create-organization";
import { OrganizationItem } from "./organization-item";
import { AddMemberModal } from "../../components/add-member-modal";
import { Organization } from "../../types";

interface OrganizationsListProps {
  organizations: Organization[];
}

export const OrganizationsList = ({
  organizations = [],
}: OrganizationsListProps) => {
  const [isCreateOrgModalOpen, setCreateOrgModalOpen] = useState(false);
  const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);

  const handleOpenMemberModal = (id: string) => {
    setAddMemberModalOpen(true);
    setOrgId(id);
  };

  const handleCreateOrg = async (name: string) => {
    try {
      await createOrganization(name);
      toast.success("Organization was created successfully");
      setCreateOrgModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="mb-4 w-full">
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <h3 className="text-xlv font-semibold">Organizations</h3>
          <Button
            label="Create organizations"
            onClick={() => {
              setCreateOrgModalOpen(true);
            }}
          />
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        {organizations?.length === 0 && (
          <p className="text-gray-500">
            No organizations found. Create one by clicking the button above.
          </p>
        )}

        {organizations?.map((org: Organization) => (
          <OrganizationItem
            key={org?.id}
            handleOpenMemberModal={handleOpenMemberModal}
            {...org}
          />
        ))}
      </div>
      {isCreateOrgModalOpen && (
        <CreateOrganizationModal
          setCreateOrgModalOpen={setCreateOrgModalOpen}
          handleCreateOrg={handleCreateOrg}
        />
      )}
      {isAddMemberModalOpen && (
        <AddMemberModal
          orgId={orgId}
          setOrgId={setOrgId}
          setAddUserModalOpen={setAddMemberModalOpen}
          canChooseRole
        />
      )}
    </div>
  );
};
