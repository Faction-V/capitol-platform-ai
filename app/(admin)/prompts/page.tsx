import { getAllPrompts } from "./services/get-all-prompts";
import { PromptsList } from "./prompts-list";

export default async function PromptsPage() {
  let result = [];

  try {
    result = await getAllPrompts();
  } catch (error) {
    console.error("Failed to get the list of prompts", error);
  }

  return <PromptsList prompts={result?.prompts} />;
}
