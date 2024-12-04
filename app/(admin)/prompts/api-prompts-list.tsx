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
  setApiPromptsList: (prompts: Array<Prompt>) => void;
}

export const ApiPromptsList = ({
  prompts = [],
  setApiPromptsList,
}: ApiPromptsListProps) => {
  const user: User | undefined = useUser();

  const [isAddPromptModalOpen, setAddPromptModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteApiPrompt({ id });
      toast.success("Prompt was deleted successfully");
      const updatedPrompts = prompts.filter((prompt) => prompt.id !== id);

      setApiPromptsList(updatedPrompts);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleSavePrompt = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();

    try {
      const response = await saveApiPromptPropsPrompt({
        prompt: trimmedPrompt,
      });

      const updatedPrompts = [...prompts, response?.prompt];

      setApiPromptsList(updatedPrompts);

      toast.success(response?.message);
    } catch (error) {
      toast.error((error as Error).message);
    }

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
          setAddPromptModalOpen={setAddPromptModalOpen}
          handleSavePrompt={handleSavePrompt}
        />
      )}
    </div>
  );
};
