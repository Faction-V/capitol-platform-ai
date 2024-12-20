"use client";
import { useState } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { PlusIcon } from "../../icons/plus-icon";
import { isEmptyString } from "../../utils/is-empty-string";
import { Textarea } from "../../components/textarea";

interface AddPromptModalProps {
  isLoading?: boolean;
  setAddPromptModalOpen: (isModalOpen: boolean) => void;
  handleSavePrompt: (prompt: string) => void;
}

export const AddPromptModal = ({
  isLoading = false,
  setAddPromptModalOpen,
  handleSavePrompt,
}: AddPromptModalProps) => {
  const [prompt, setPrompt] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isEmptyString(prompt)) {
      return;
    }

    if (event.key === "Enter") {
      handleSavePrompt(prompt);
    }
  };

  return (
    <Modal closeModal={() => setAddPromptModalOpen(false)}>
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
          isLoading={isLoading}
          onClick={() => handleSavePrompt(prompt)}
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
