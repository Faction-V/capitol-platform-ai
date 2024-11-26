import KeysList from "./keys-list";
import { getAllApiKeys } from "./services/get-all-api-keys";

export default async function HomePage() {
  let result = [];

  try {
    result = await getAllApiKeys();
  } catch (error) {
    console.error("Failed to get the list of api keys", error);
  }

  return <KeysList keys={result} />;
}
