import KeysList from "./keys-list";
import { getAllApiKeys } from "./services/get-all-api-keys";

export default async function HomePage() {
  const result = await getAllApiKeys();
  return <KeysList />;
}
