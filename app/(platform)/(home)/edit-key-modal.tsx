import { useState } from "react";
import { toast } from "react-toastify";
import { createApiKey } from "./services/create-api-key";
import { editApiKey } from "./services/edit-api-key";
import { KeyIcon } from "../../icons/key-icon";
import { Key } from "../../types";
import { Input } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { Modal } from "@/app/components/modal";
import { isEmptyString } from "../../utils/is-empty-string";

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
  const [isLoading, setIsLoading] = useState(false);
  const title = isEdit ? "Edit API key" : "Add new API key";

  const createKey = async () => {
    try {
      setIsLoading(true);
      const result = await createApiKey({
        name: name?.trim(),
        domain: domain?.trim(),
      });
      setIsLoading(false);
      if (addKey) {
        addKey(result);
      }
      toast.success("Key was created successfully");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Failed to create api key");
    }
  };

  const renameKey = async () => {
    try {
      setIsLoading(true);
      await editApiKey({
        id: keyId,
        name: name?.trim(),
        domain: domain?.trim(),
      });
      setIsLoading(false);
      if (editKey) {
        editKey({
          id: keyId,
          name: name?.trim(),
          domain: domain?.trim(),
        });
      }
      toast.success("Key was renamed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to rename the api key");
      setIsLoading(false);
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
    <Modal closeModal={() => setIsNameModalOpen(false)}>
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
                  className="block mb-2 text-sm font-medium text-gray-900"
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
                  className="block mb-2 text-sm font-medium text-gray-900"
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
        <Button
          isLoading={isLoading}
          disabled={isEmptyString(name) || isLoading}
          label="Save"
          onClick={handleSave}
        />
        <Button
          type="secondary"
          label="Cancel"
          onClick={() => setIsNameModalOpen(false)}
        />
      </div>
    </Modal>
  );
};
