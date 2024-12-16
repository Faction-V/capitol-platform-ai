import { useState } from "react";
import { TrashIcon } from "../../icons/trash-icon";
import { DeleteConfirmationModal } from "../../components/delete-confirmation-modal";
import { Button } from "@/app/components/button";

interface PromptItemProps {
  id: string;
  prompt: string;
  handleDelete: (id: string) => void;
}

export const PromptItem = ({ prompt, id, handleDelete }: PromptItemProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center mb-2 w-full">
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
          handleDelete={() => {
            handleDelete(id);
            setIsConfirmationModalOpen(false);
          }}
          handleCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </>
  );
};
