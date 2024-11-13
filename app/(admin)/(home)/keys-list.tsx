"use client";

import { useState } from "react";
import { NameModal } from "./name-modal";
import { ToastContainer, toast } from "react-toastify";
import { TrashIcon } from "../../icons/trash-icon";
import { EditIcon } from "../../icons/edit-icon";

export default function KeysList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notify = () => toast.success("Key was created successfully!");

  return (
    <div className="mb-4 2xl:col-span-2">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flow-root">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold dark:text-white">API keys</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center"
          >
            New API key
          </button>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5">
          <div className="flex flex-col justify-between leading-normal gap-2">
            <h5 className="text-lg font-bold tracking-tight text-gray-900">
              Key name
            </h5>
            <p className="font-normal text-gray-700">key</p>
          </div>
          <div className="flex gap-2 items-start">
            <button
              type="button"
              className="py-1.5 px-1.5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              <EditIcon />
            </button>
            <button
              type="button"
              className="py-1.5 px-1.5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <NameModal setIsModalOpen={setIsModalOpen} notify={notify} />
      )}
    </div>
  );
}
