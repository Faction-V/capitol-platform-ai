import { useState } from "react";
import { toast } from "react-toastify";
import { EditIcon } from "../../icons/edit-icon";
import { TrashIcon } from "../../icons/trash-icon";
import { EditKeyModal } from "./edit-key-modal";
import { ConfirmationModal } from "./confirmation-modal";
import { Key } from "./types";
import { deleteApiKey } from "./services/delete-api-key";

interface KeyItemProps extends Key {
  deleteKey: (id: string) => void;
  editKey: ({
    id,
    name,
    domain,
  }: {
    id: string;
    name: string;
    domain: string;
  }) => void;
}

export const KeyItem = ({
  name,
  apiKey,
  id,
  editKey,
  deleteKey,
  domain,
}: KeyItemProps) => {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteApiKey({ id });
      deleteKey(id);
      toast.success("Key was deleted successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
        <div className="flex flex-col justify-between leading-normal gap-2">
          <h5 className="font-bold tracking-tight text-gray-900">{name}</h5>
          <p className="font-normal text-gray-700">{apiKey}</p>
          <span className="text-sm text-gray-700">{domain}</span>
        </div>
        <div className="flex gap-2 items-start">
          <button
            onClick={() => setIsNameModalOpen(true)}
            type="button"
            className="py-1.5 px-1.5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => setIsConfirmationModalOpen(true)}
            type="button"
            className="py-1.5 px-1.5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          handleDelete={handleDelete}
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        />
      )}
      {isNameModalOpen && (
        <EditKeyModal
          setIsNameModalOpen={setIsNameModalOpen}
          isEdit
          keyName={name}
          keyId={id}
          editKey={editKey}
          keyDomain={domain}
        />
      )}
    </>
  );
};
