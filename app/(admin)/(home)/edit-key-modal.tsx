import { useState } from "react";
import { toast } from "react-toastify";
import { createApiKey } from "./services/create-api-key";
import { editApiKey } from "./services/edit-api-key";
import { KeyIcon } from "../../icons/key-icon";
import { Key } from "./types";

import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/app/components/input";

interface NameModalProps {
  isEdit?: boolean;
  keyName?: string;
  keyId?: string;
  keyDomain?: string;
  setIsNameModalOpen: (isModalOpen: boolean) => void;
  editKey?: ({
    id,
    name,
    domain,
  }: {
    id: string;
    name: string;
    domain: string;
  }) => void;
  addKey?: (key: Key) => void;
}

const isEmptyString = (str: string) => {
  return !str || str.length === 0;
};

export const EditKeyModal = ({
  setIsNameModalOpen,
  isEdit = false,
  keyName = "",
  keyDomain = "",
  keyId = "",
  editKey,
  addKey,
}: NameModalProps) => {
  const [name, setName] = useState(keyName);
  const [domain, setDomain] = useState(keyDomain);
  const title = isEdit ? "Edit API key" : "Add new API key";

  const createKey = async () => {
    try {
      const result = await createApiKey({ name, domain });
      if (addKey) {
        addKey(result);
      }
      toast.success("Key was created successfully");
      console.log("result", result);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const renameKey = async () => {
    try {
      await editApiKey({ id: keyId, name: name, domain });
      if (editKey) {
        editKey({ id: keyId, name, domain });
      }
      toast.success("Key was renamed successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleSave = async () => {
    if (isEdit) {
      await renameKey();
    } else {
      await createKey();
    }
    setIsNameModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEmptyString(name) || isEmptyString(domain)) {
      return;
    }

    if (event.key === "Enter") {
      handleSave();
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
                    {title}
                  </h3>
                  <hr className="h-px my-3 bg-gray-200 border-0" />
                  <div className="mt-2">
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Key name
                      </label>
                      <Input
                        onChange={(value: string) => setName(value)}
                        onKeyDown={handleKeyDown}
                        value={name}
                        type="text"
                        id="name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Domain
                      </label>
                      <Input
                        onChange={(value: string) => setDomain(value)}
                        onKeyDown={handleKeyDown}
                        value={domain}
                        type="text"
                        id="domain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
              <button
                disabled={isEmptyString(name)}
                onClick={handleSave}
                type="button"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center disabled:opacity-75 disabled:hover:bg-primary-700 disabled:cursor-not-allowed"
              >
                Save
              </button>
              <button
                onClick={() => setIsNameModalOpen(false)}
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
