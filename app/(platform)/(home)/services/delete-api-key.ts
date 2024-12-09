"use server";

import { cookies } from "next/headers";

interface DeleteApiKeyProps {
  id: string;
}

export async function deleteApiKey({ id }: DeleteApiKeyProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org/key?api-key-id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",

      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete the api key");
  }

  return await response?.json();
}
