import "react-toastify/dist/ReactToastify.css";
import { TrashIcon } from "../../icons/trash-icon";
import { Button } from "@/app/components/button";

interface ConfirmationModalProps {
  setIsConfirmationModalOpen: (isModalOpen: boolean) => void;
  handleDelete: () => void;
}

export const ConfirmationModal = ({
  setIsConfirmationModalOpen,
  handleDelete,
}: ConfirmationModalProps) => {
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
                      Are you sure you want to delete the key? This action
                      cannot be undone.
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
          </div>
        </div>
      </div>
    </div>
  );
};
