import { EditIcon } from "../../icons/edit-icon";
import { TrashIcon } from "../../icons/trash-icon";
import { NameModal } from "./name-modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { ConfirmationModal } from "./confirmation-modal";

export const KeyItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notify = () => toast.success("Key was renamed successfully!");

  return (
    <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5">
      <div className="flex flex-col justify-between leading-normal gap-2">
        <h5 className="text-lg font-bold tracking-tight text-gray-900">
          Key name
        </h5>
        <p className="font-normal text-gray-700">key</p>
      </div>
      <div className="flex gap-2 items-start">
        <button
          onClick={() => setIsModalOpen(true)}
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
      {/*
      <ConfirmationModal />
*/}
      {isModalOpen && (
        <NameModal setIsModalOpen={setIsModalOpen} notify={notify} isEdit />
      )}
    </div>
  );
};
