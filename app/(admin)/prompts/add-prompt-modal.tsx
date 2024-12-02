"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { PlusIcon } from "../../icons/plus-icon";
import { isEmptyString } from "../../utils/is-empty-string";
import "react-toastify/dist/ReactToastify.css";
import { savePrompt } from "./services/save-prompt";
import { Textarea } from "../../components/textarea";

interface AddPromptModalProps {
  setAddPromptModalOpen: (isModalOpen: boolean) => void;
  onSaveCallback: (prompt: { id: string; prompt: string }) => void;
}

export const AddPromptModal = ({
  setAddPromptModalOpen,
  onSaveCallback,
}: AddPromptModalProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSavePrompt = async () => {
    const trimmedPrompt = prompt.trim();

    try {
      const response = await savePrompt({ prompt: trimmedPrompt });

      onSaveCallback(response?.prompt);

      toast.success(response?.message);
    } catch (error) {
      toast.error((error as Error).message);
    }

    setAddPromptModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isEmptyString(prompt)) {
      return;
    }

    if (event.key === "Enter") {
      handleSavePrompt();
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
              Add prompt
            </h3>
            <hr className="h-px my-3 bg-gray-200 border-0" />
            <div className="mt-2">
              <div className="mb-3">
                <Textarea
                  onChange={(value: string) => {
                    setPrompt(value);
                  }}
                  onKeyDown={handleKeyDown}
                  value={prompt}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
        <Button
          disabled={isEmptyString(prompt)}
          label="Save"
          onClick={handleSavePrompt}
        />
        <Button
          type="secondary"
          label="Cancel"
          onClick={() => setAddPromptModalOpen(false)}
        />
      </div>
    </Modal>
  );
};
