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

interface Prompt {
  id: string;
  prompt: string;
}

interface ApiPromptsListProps {
  prompts: Array<Prompt>;
}

export const ApiPromptsList = ({ prompts = [] }: ApiPromptsListProps) => {
  const user: User | undefined = useUser();

  const [isAddPromptModalOpen, setAddPromptModalOpen] = useState(false);
  const [promptsList, setPromptsList] = useState(prompts);

  const handleDelete = async (id: string) => {
    try {
      await deleteApiPrompt({ id });
      toast.success("Prompt was deleted successfully");
      const updatedPrompts = promptsList.filter((prompt) => prompt.id !== id);

      setPromptsList(updatedPrompts);
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

      const updatedPrompts = [...promptsList, response?.prompt];

      setPromptsList(updatedPrompts);

      toast.success(response?.message);
    } catch (error) {
      toast.error((error as Error).message);
    }

    setAddPromptModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="flex flex-col">
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
        {promptsList?.length === 0 && (
          <p className="text-gray-500">
            Add example prompts and press &#34;Generate prompts&#34; button
          </p>
        )}

        {promptsList?.map((prompt: Prompt) => (
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
