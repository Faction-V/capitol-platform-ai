import { TrashIcon } from "../icons/trash-icon";
import { Button } from "./button";
import { Modal } from "./modal";

interface DeleteConfirmationModalProps {
  title: string;
  description: string;
  buttonLabel: string;
  isLoading?: boolean;
  handleDelete: () => void;
  handleCancel: () => void;
}

export const DeleteConfirmationModal = ({
  handleDelete,
  title,
  description,
  handleCancel,
  buttonLabel,
  isLoading = false,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal closeModal={handleCancel}>
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
              {title}
            </h3>
            <hr className="h-px my-3 bg-gray-200 border-0" />
            <div className="mt-2">
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
        <Button
          label={buttonLabel}
          onClick={handleDelete}
          isLoading={isLoading}
        />
        <Button label="Cancel" onClick={handleCancel} type="secondary" />
      </div>
    </Modal>
  );
};
