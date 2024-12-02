"use server";

import { cookies } from "next/headers";

interface DeletePromptProps {
  id: string;
}

export async function deletePrompt({ id }: DeletePromptProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/api_example_prompts/${id}`, {
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
