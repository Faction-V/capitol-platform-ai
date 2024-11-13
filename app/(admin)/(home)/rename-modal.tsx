import { useState } from "react";
import { createApiKeys } from "./services/create-api-keys";
import { KeyIcon } from "../../icons/key-icon";

import "react-toastify/dist/ReactToastify.css";

const isEmptyString = (str: string) => {
  return !str || str.length === 0;
};

export const RenameModal = ({
  setIsModalOpen,
  notify,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
  notify: () => void;
}) => {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    await createApiKeys({ name });
    notify();
    setIsModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEmptyString(name)) {
      return;
    }

    if (event.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <div
      className="relative z-30"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5">
              <div className="flex gap-4">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <KeyIcon />
                </div>
                <div className="flex-grow">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    Add new API key
                  </h3>
                  <hr className="h-px my-3 bg-gray-200 border-0" />
                  <div className="mt-2">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Key name
                      </label>
                      <input
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
              <button
                disabled={isEmptyString(name)}
                onClick={handleCreate}
                type="button"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center disabled:opacity-75 disabled:hover:bg-primary-700 disabled:cursor-not-allowed"
              >
                New API key
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="px-2.5 py-1.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};