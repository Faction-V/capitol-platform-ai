"use client";

import { useState } from "react";
import { MemberItem } from "./member-item";
import { Button } from "@/app/components/button";
import { AddMemberModal } from "../../components/add-member-modal";
import { Member, User } from "../../types";
import { useUser } from "../UserProvider";

interface MembersListProps {
  canChooseRole?: boolean;
  members: Member[];
}

export default function MembersList({
  members,
  canChooseRole = false,
}: MembersListProps) {
  const user: User | undefined = useUser();
  const [membersList, setMembersList] = useState(members);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const updateMembersAfterRemove = (id: string) => {
    const filteredMembers = membersList.filter((member) => member.id !== id);
    setMembersList(filteredMembers);
  };

  return (
    <div className="mb-4 w-full">
      <div className="flow-root">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">Members</h3>
          {user?.isOwner && (
            <Button
              label="Add member"
              onClick={() => setAddUserModalOpen(true)}
            />
          )}
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <div>
          {membersList.map((member: Member) => (
            <MemberItem
              isOwner={user?.isOwner}
              key={member.id}
              {...member}
              updateMembersAfterRemove={updateMembersAfterRemove}
            />
          ))}
        </div>
      </div>
      {isAddUserModalOpen && (
        <AddMemberModal
          setAddUserModalOpen={setAddUserModalOpen}
          canChooseRole={canChooseRole}
        />
      )}
    </div>
  );
}
