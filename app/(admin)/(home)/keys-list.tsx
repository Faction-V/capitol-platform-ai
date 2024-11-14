"use client";

import { useState } from "react";
import { NameModal } from "./name-modal";
import { ToastContainer, toast } from "react-toastify";
import { KeyItem } from "./key-item";
import { Key } from "./types";

interface KeysListProps {
  keys: Array<Key>;
}

export default function KeysList({ keys }: KeysListProps) {
  const [keysList, setKeyList] = useState(keys);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const notify = () => toast.success("Key was created successfully!");

  const updateName = ({ id, name }: { id: string; name: string }) => {
    const updatedKeys = keysList.map((key) => {
      if (key.id === id) {
        return {
          ...key,
          name,
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
            onClick={() => setIsNameModalOpen(true)}
            type="button"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center"
          >
            New API key
          </button>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        {keysList.map((item) => (
          <KeyItem
            key={item?.id}
            {...item}
            updateName={updateName}
            deleteKey={deleteKey}
          />
        ))}
      </div>
      {isNameModalOpen && (
        <NameModal
          setIsNameModalOpen={setIsNameModalOpen}
          notify={notify}
          addKey={addKey}
        />
      )}
    </div>
  );
}
