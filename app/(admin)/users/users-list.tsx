"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { UserItem } from "@/app/(admin)/users/user-item";
import { Button } from "@/app/components/button";

export default function UsersList() {
  const [isAddAddUserModalOpen, setAddAddUserModalOpen] = useState(false);
  console.log("isAddAddUserModalOpen", isAddAddUserModalOpen);

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
          <UserItem lastName="Tub" firstName="Elen" />
          <UserItem lastName="Sub" firstName="Elen" />
          <UserItem lastName="wub" firstName="Elen" />
        </div>
      </div>
    </div>
  );
}
