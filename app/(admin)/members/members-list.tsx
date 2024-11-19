"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { MemberItem } from "./member-item";
import { Button } from "@/app/components/button";
import { AddMemberModal } from "./add-member-modal";
import { Member } from "./types";

export default function MembersList({ members }: { members: Member[] }) {
  const [membersList, setMembersList] = useState(members);
  const [isAddAddUserModalOpen, setAddAddUserModalOpen] = useState(false);

  const updateMembersAfterRemove = (id: string) => {
    const filteredMembers = membersList.filter((member) => member.id !== id);
    setMembersList(filteredMembers);
  };

  return (
    <div className="mb-4">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
      <div className="flow-root">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold dark:text-white">Members</h3>
          <Button
            label="Add member"
            onClick={() => setAddAddUserModalOpen(true)}
          />
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <div>
          {membersList.map((member: Member) => (
            <MemberItem
              key={member.id}
              {...member}
              updateMembersAfterRemove={updateMembersAfterRemove}
            />
          ))}
        </div>
      </div>
      {isAddAddUserModalOpen && (
        <AddMemberModal setAddAddUserModalOpen={setAddAddUserModalOpen} />
      )}
    </div>
  );
}
