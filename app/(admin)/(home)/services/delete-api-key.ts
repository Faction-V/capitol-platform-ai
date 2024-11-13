"use server";

interface DeleteApiKeyProps {
  id: string;
}

export async function deleteApiKey({ id }: DeleteApiKeyProps) {
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/integration/key?api-key-id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response?.json();
}
