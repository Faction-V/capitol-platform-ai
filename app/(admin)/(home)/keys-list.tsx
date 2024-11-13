"use client";

import { useState } from "react";
import { RenameModal } from "./rename-modal";

export default function KeysList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 mb-4 2xl:col-span-2 sm:p-6">
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
        <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-center p-2">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Key name
            </h5>
            <p className="mb-3 font-normal text-gray-700">key</p>
          </div>
          <button
            type="button"
            className="py-1.5 px-1.5 me-2 mb-2 text-sm font-medium text-red-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-red-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Delete
          </button>
        </div>
      </div>
      {isModalOpen && <RenameModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
