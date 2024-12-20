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
  setExamplePromptsList: (prompts: Array<Prompt>) => void;
}

export const ExamplePromptsList = ({
  prompts = [],
  setExamplePromptsList,
}: ExamplePromptsListProps) => {
  const user: User | undefined = useUser();

  const [isAddPromptModalOpen, setAddPromptModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false);

  const handleSavePrompt = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();
    setIsLoading(true);

    try {
      const response = await saveExamplePrompt({ prompt: trimmedPrompt });

      const updatedPrompts = [...prompts, response?.prompt];

      setExamplePromptsList(updatedPrompts);

      toast.success(response?.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save the prompt");
    }

    setIsLoading(false);
    setAddPromptModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteExamplePrompt({ id });
      toast.success("Prompt was deleted successfully");
      const updatedPrompts = prompts.filter((prompt) => prompt.id !== id);

      setExamplePromptsList(updatedPrompts);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the prompt");
    }
    setIsLoading(false);
  };

  const handleRegeneratePrompts = async () => {
    setIsGeneratingPrompts(true);
    try {
      await regeneratePrompts();
      toast.success("Prompts were generated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate prompts");
    }
    setIsGeneratingPrompts(false);
  };

  return (
    <div className="flex flex-grow bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2 h-full">
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <h3 className="text-xlv font-semibold">Example prompts</h3>

          {user?.isOwner && (
            <div className="flex gap-2">
              <Button
                label="Add example prompt"
                onClick={() => {
                  setAddPromptModalOpen(true);
                }}
              />
              <Button
                isLoading={isGeneratingPrompts}
                label="Generate prompts"
                onClick={handleRegeneratePrompts}
              />
            </div>
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
