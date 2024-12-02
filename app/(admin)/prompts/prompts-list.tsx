"use client";

import { ToastContainer } from "react-toastify";
import { Button } from "../../components/button";
import { useState } from "react";
import { AddPromptModal } from "./add-prompt-modal";
import { PromptItem } from "./prompt-item";
import { User } from "../../types";
import { useUser } from "../UserProvider";

interface Prompt {
  id: string;
  prompt: string;
}

interface PromptsListProps {
  prompts: Array<Prompt>;
}

export const PromptsList = ({ prompts = [] }: PromptsListProps) => {
  const user: User | undefined = useUser();
  const isAdmin: boolean = user?.typeName === "Admin";

  const [isAddPromptModalOpen, setAddPromptModalOpen] = useState(false);
  const [promptsList, setPromptsList] = useState(prompts);

  const onDeleteCallback = (id: string) => {
    const updatedPrompts = promptsList.filter((prompt) => prompt.id !== id);

    setPromptsList(updatedPrompts);
  };

  const onSaveCallback = (prompt: Prompt) => {
    const updatedPrompts = [...promptsList, prompt];

    setPromptsList(updatedPrompts);
  };

  return (
    <div className="mb-4">
      <div className="flow-root">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        <div className="flex justify-between">
          <h3 className="text-xlv font-semibold">Suggested prompts</h3>
          {isAdmin && (
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
            There are no prompts associated with your account.
          </p>
        )}

        {promptsList?.map((prompt: Prompt) => (
          <PromptItem
            key={prompt?.id}
            id={prompt?.id}
            prompt={prompt?.prompt}
            onDeleteCallback={onDeleteCallback}
          />
        ))}
      </div>
      {isAddPromptModalOpen && (
        <AddPromptModal
          setAddPromptModalOpen={setAddPromptModalOpen}
          onSaveCallback={onSaveCallback}
        />
      )}
    </div>
  );
};
