"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { MemberItem } from "./member-item";
import { Button } from "@/app/components/button";
import { AddMemberModal } from "./add-member-modal";

export default function MembersList() {
  const [isAddAddUserModalOpen, setAddAddUserModalOpen] = useState(false);

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
          <h3 className="text-xl font-semibold dark:text-white">Users</h3>
          <Button
            label="Add user"
            onClick={() => setAddAddUserModalOpen(true)}
          />
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <div>
          <MemberItem lastName="Tub" firstName="Elen" />
          <MemberItem lastName="Sub" firstName="Elen" />
          <MemberItem lastName="wub" firstName="Elen" />
        </div>
      </div>
      {isAddAddUserModalOpen && (
        <AddMemberModal setAddAddUserModalOpen={setAddAddUserModalOpen} />
      )}
    </div>
  );
}
