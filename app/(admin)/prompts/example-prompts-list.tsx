"use client";

import { toast } from "react-toastify";
import { Button } from "../../components/button";
import { useState } from "react";
import { AddPromptModal } from "./add-prompt-modal";
import { PromptItem } from "./prompt-item";
import { User } from "../../types";
import { useUser } from "../UserProvider";
import { saveExamplePrompt } from "./services/save-example-prompt";
import { regeneratePrompts } from "./services/regenerate-prompts";
import { deleteExamplePrompt } from "./services/delete-example-prompt";

interface Prompt {
  id: string;
  prompt: string;
}

interface ExamplePromptsListProps {
  prompts: Array<Prompt>;
}

export const ExamplePromptsList = ({
  prompts = [],
}: ExamplePromptsListProps) => {
  const user: User | undefined = useUser();

  const [isAddPromptModalOpen, setAddPromptModalOpen] = useState(false);
  const [promptsList, setPromptsList] = useState(prompts);

  const handleSavePrompt = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();

    try {
      const response = await saveExamplePrompt({ prompt: trimmedPrompt });

      const updatedPrompts = [...promptsList, response?.prompt];

      setPromptsList(updatedPrompts);

      toast.success(response?.message);
    } catch (error) {
      toast.error((error as Error).message);
    }

    setAddPromptModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExamplePrompt({ id });
      toast.success("Prompt was deleted successfully");
      const updatedPrompts = promptsList.filter((prompt) => prompt.id !== id);

      setPromptsList(updatedPrompts);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-xlv font-semibold">Example prompts</h3>
          {user?.isOwner && (
            <Button
              label="Add example prompt"
              onClick={() => {
                setAddPromptModalOpen(true);
              }}
            />
          )}
          {user?.isOwner && (
            <Button
              label="Generate prompts"
              onClick={async () => {
                const result = await regeneratePrompts();
                console.log("result", result);
              }}
            />
          )}
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        {promptsList?.length === 0 && (
          <p className="text-gray-500">
            There are no prompts associated with your account.
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
