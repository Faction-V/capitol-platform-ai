import { getGuardrailsConfigs } from "./services/get-guardrails-configs";
import GuardrailsList from "./guardrails-list";

export default async function GuardrailsPage() {
  let result = [];

  try {
    result = await getGuardrailsConfigs();
  } catch (error) {
    console.error("Failed to get the list of api keys", error);
  }

  console.log(result);

  return <GuardrailsList configs={result} />;
}
