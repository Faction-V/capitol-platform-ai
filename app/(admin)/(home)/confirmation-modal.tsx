import "react-toastify/dist/ReactToastify.css";
import { TrashIcon } from "../../icons/trash-icon";
import { Button } from "@/app/components/button";
import { Modal } from "@/app/components/modal";

interface ConfirmationModalProps {
  setIsConfirmationModalOpen: (isModalOpen: boolean) => void;
  handleDelete: () => void;
}

export const ConfirmationModal = ({
  setIsConfirmationModalOpen,
  handleDelete,
}: ConfirmationModalProps) => {
  return (
    <Modal>
      <div className="bg-white px-4 pb-4 pt-5">
        <div className="flex gap-4">
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <TrashIcon size={24} />
          </div>
          <div className="flex-grow">
            <h3
              className="text-base font-semibold text-gray-900"
              id="modal-title"
            >
              Delete API key
            </h3>
            <hr className="h-px my-3 bg-gray-200 border-0" />
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete the key? This action cannot be
                undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
        <Button label="Delete key" onClick={handleDelete} />
        <Button
          label="Cancel"
          onClick={() => setIsConfirmationModalOpen(false)}
          type="secondary"
        />
      </div>
    </Modal>
  );
};
