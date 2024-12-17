"use client";

import { Button } from "../../components/button";
import { useState } from "react";
import { AddPromptModal } from "./add-prompt-modal";
import { PromptItem } from "./prompt-item";
import { User } from "../../types";
import { useUser } from "../UserProvider";
import { toast } from "react-toastify";
import { saveApiPromptPropsPrompt } from "./services/save-api-prompt";
import { deleteApiPrompt } from "./services/delete-api-prompt";
import { Prompt } from "../../types";

interface ApiPromptsListProps {
  prompts: Array<Prompt>;
}

export const ApiPromptsList = ({ prompts = [] }: ApiPromptsListProps) => {
  const user: User | undefined = useUser();

  const [isAddPromptModalOpen, setAddPromptModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteApiPrompt({ id });
      toast.success("Prompt was deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the prompt");
    }
    setIsLoading(false);
  };

  const handleSavePrompt = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();
    setIsLoading(true);
    try {
      const response = await saveApiPromptPropsPrompt({
        prompt: trimmedPrompt,
      });

      toast.success(response?.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save the prompt");
    }
    setIsLoading(false);
    setAddPromptModalOpen(false);
  };

  return (
    <div className="flex  flex-grow bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2 h-full">
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <h3 className="text-xlv font-semibold">Suggested prompts</h3>
          {user?.isOwner && (
            <Button
              label="Add prompt"
              onClick={() => {
                setAddPromptModalOpen(true);
              }}
            />
          )}
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        {prompts?.length === 0 && (
          <p className="text-gray-500">
            Add example prompts and press &#34;Generate prompts&#34; button
          </p>
        )}

        {prompts?.map((prompt: Prompt) => (
          <PromptItem
            key={prompt?.id}
            id={prompt?.id}
            prompt={prompt?.prompt}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      {isAddPromptModalOpen && (
        <AddPromptModal
          isLoading={isLoading}
          setAddPromptModalOpen={setAddPromptModalOpen}
          handleSavePrompt={handleSavePrompt}
        />
      )}
    </div>
  );
};
