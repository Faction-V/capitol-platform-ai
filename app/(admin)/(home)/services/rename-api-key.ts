"use server";

interface RenameApiKeyProps {
  id: string;
}

export async function renameApiKey({ id }: RenameApiKeyProps) {
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/integration/key?api-key-id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response?.json();
}
