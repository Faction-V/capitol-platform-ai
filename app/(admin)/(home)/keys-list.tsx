"use client";

import { useState } from "react";
import { EditKeyModal } from "./edit-key-modal";
import { ToastContainer } from "react-toastify";
import { KeyItem } from "./key-item";
import { Key } from "./types";

interface KeysListProps {
  keys: Array<Key>;
}

export default function KeysList({ keys }: KeysListProps) {
  const [keysList, setKeyList] = useState(keys);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  const editKey = ({
    id,
    name,
    domain,
  }: {
    id: string;
    name: string;
    domain: string;
  }) => {
    const updatedKeys = keysList.map((key) => {
      if (key.id === id) {
        return {
          ...key,
          name,
          domain,
        };
      }

      return key;
    });

    setKeyList(updatedKeys);
  };

  const deleteKey = (id: string) => {
    const updatedKeys = keysList.filter((key) => key.id !== id);

    setKeyList(updatedKeys);
  };

  const addKey = (key: Key) => {
    const updatedKeys = [...keysList, key];

    setKeyList(updatedKeys);
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
          <h3 className="text-xl font-semibold dark:text-white">API keys</h3>
          <button
            onClick={() => setIsNameModalOpen(true)}
            type="button"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center"
          >
            New API key
          </button>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        {keysList.length === 0 && (
          <p className="text-gray-500">
            There are no API keys associated with your account.
          </p>
        )}
        {keysList.map((item) => (
          <KeyItem
            key={item?.id}
            {...item}
            editKey={editKey}
            deleteKey={deleteKey}
          />
        ))}
      </div>
      {isNameModalOpen && (
        <EditKeyModal setIsNameModalOpen={setIsNameModalOpen} addKey={addKey} />
      )}
    </div>
  );
}
