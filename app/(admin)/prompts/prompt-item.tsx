import { useState } from "react";
import { toast } from "react-toastify";
import { TrashIcon } from "../../icons/trash-icon";
import { DeleteConfirmationModal } from "../../components/delete-confirmation-modal";
import { deletePrompt } from "./services/delete-prompt";
import { Button } from "@/app/components/button";

interface PromptItemProps {
  id: string;
  prompt: string;
  onDeleteCallback: (id: string) => void;
}

export const PromptItem = ({
  prompt,
  id,
  onDeleteCallback,
}: PromptItemProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePrompt({ id });
      toast.success("Prompt was deleted successfully");
      setIsConfirmationModalOpen(false);
      onDeleteCallback(id);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
        <div className="flex flex-col justify-between leading-normal gap-2">
          <p className="font-normal text-gray-700">{prompt}</p>
        </div>
        <Button
          label={<TrashIcon />}
          type="secondary"
          onClick={() => setIsConfirmationModalOpen(true)}
        />
      </div>
      {isConfirmationModalOpen && (
        <DeleteConfirmationModal
          title="Delete prompt"
          description="Are you sure you want to delete the prompt? This action cannot be undone."
          buttonLabel="Delete prompt"
          handleDelete={handleDelete}
          handleCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </>
  );
};
