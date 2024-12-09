import { getExamplesPrompts } from "./services/get-examples-prompts";
import { getApiPrompts } from "./services/get-api-prompts";
import { PromptsContainer } from "./prompts-container";

interface Prompt {
  id: string;
  prompt: {
    prompt: string;
    longPrompt: string;
  };
}

export default async function PromptsPage() {
  let examplePrompts = [];
  let apiPromptsResult = [];
  let apiPrompts = [];

  try {
    examplePrompts = await getExamplesPrompts();
  } catch (error) {
    console.error("Failed to get the list of prompts", error);
  }

  try {
    apiPromptsResult = await getApiPrompts();

    apiPrompts = apiPromptsResult?.prompts.map((prompt: Prompt) => ({
      id: prompt?.id,
      prompt: prompt?.prompt.prompt,
    }));
  } catch (error) {
    console.error("Failed to get the list of prompts", error);
  }

  return (
    <>
      <PromptsContainer
        apiPrompts={apiPrompts}
        examplePrompts={examplePrompts?.prompts}
      />
    </>
  );
}
