"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { UserItem } from "@/app/(admin)/users/user-item";

export default function UsersList() {
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
          <button
            onClick={() => setAddAddUserModalOpen(true)}
            type="button"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center"
          >
            Add user
          </button>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <div>
          <UserItem />
        </div>
      </div>
    </div>
  );
}
