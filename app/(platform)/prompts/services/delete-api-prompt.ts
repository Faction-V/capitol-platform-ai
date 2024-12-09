"use server";

import { cookies } from "next/headers";

interface DeleteApiPromptProps {
  id: string;
}

export async function deleteApiPrompt({ id }: DeleteApiPromptProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/api_prompts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete the prompt");
  }

  return await response?.json();
}
