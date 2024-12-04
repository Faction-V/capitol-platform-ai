"use client";

import { ExamplePromptsList } from "./example-prompts-list";
import { ApiPromptsList } from "./api-prompts-list";
import { useState } from "react";
import { Prompt } from "../../types";

interface PromptsContainerProps {
  apiPrompts: Array<Prompt>;
  examplePrompts: Array<Prompt>;
}

export const PromptsContainer = ({
  apiPrompts,
  examplePrompts,
}: PromptsContainerProps) => {
  const [apiPromptsList, setApiPromptsList] = useState(apiPrompts);
  const [examplePromptsList, setExamplePromptsList] = useState(examplePrompts);

  const updateApiPromptsList = (prompts: Array<Prompt>) => {
    setApiPromptsList(prompts);
  };

  return (
    <div className="flex gap-4 w-full">
      <ExamplePromptsList
        prompts={examplePromptsList}
        setExamplePromptsList={setExamplePromptsList}
        updateApiPromptsList={updateApiPromptsList}
      />
      <ApiPromptsList
        prompts={apiPromptsList}
        setApiPromptsList={setApiPromptsList}
      />
    </div>
  );
};
