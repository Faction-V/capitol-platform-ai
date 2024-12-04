import { getExamplesPrompts } from "./services/get-examples-prompts";
import { ExamplePromptsList } from "./example-prompts-list";
import { ApiPromptsList } from "./api-prompts-list";
import { ToastContainer } from "react-toastify";
import { getApiPrompts } from "./services/get-api-prompts";

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
    console.log("apiPrompts", apiPrompts);
  } catch (error) {
    console.error("Failed to get the list of prompts", error);
  }

  return (
    <>
      <div className="grid grid-cols-2 w-full gap-8">
        <ExamplePromptsList prompts={examplePrompts?.prompts} />
        <ApiPromptsList prompts={apiPrompts} />
      </div>
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
    </>
  );
}
