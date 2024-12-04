"use client";
import { KeyboardEvent, useState } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { PlusIcon } from "../../icons/plus-icon";
import { isEmptyString } from "../../utils/is-empty-string";
import "react-toastify/dist/ReactToastify.css";
import { Textarea } from "../../components/textarea";
import { Input } from "../../components/input";

interface CreateOrganizationModalProps {
  setCreateOrgModalOpen: (isModalOpen: boolean) => void;
  handleCreateOrg: (name: string) => void;
}

export const CreateOrganizationModal = ({
  setCreateOrgModalOpen,
  handleCreateOrg,
}: CreateOrganizationModalProps) => {
  const [name, setName] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isEmptyString(name)) {
      return;
    }

    if (event.key === "Enter") {
      handleCreateOrg(name);
    }
  };

  return (
    <Modal>
      <div className="bg-white px-4 pb-4 pt-5">
        <div className="flex gap-4">
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <PlusIcon />
          </div>
          <div className="flex-grow">
            <h3
              className="text-base font-semibold text-gray-900"
              id="modal-title"
            >
              Add organization
            </h3>
            <hr className="h-px my-3 bg-gray-200 border-0" />
            <div className="mt-2">
              <div className="mb-3">
                <Input
                  onChange={(value: string) => {
                    setName(value);
                  }}
                  onKeyDown={handleKeyDown}
                  value={name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
        <Button
          disabled={isEmptyString(name)}
          label="Save"
          onClick={() => handleCreateOrg(name)}
        />
        <Button
          type="secondary"
          label="Cancel"
          onClick={() => setCreateOrgModalOpen(false)}
        />
      </div>
    </Modal>
  );
};
