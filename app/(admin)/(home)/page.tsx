import KeysList from "./keys-list";
import { getAllApiKeys } from "./services/get-all-api-keys";
import { toast } from "react-toastify";

export default async function HomePage() {
  let result = [];

  try {
    result = await getAllApiKeys();
  } catch (error) {
    toast.error((error as Error).message);
  }
  return <KeysList keys={result} />;
}
