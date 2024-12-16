"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

interface SaveApiPromptProps {
  prompt: string;
}

export async function saveApiPromptPropsPrompt({ prompt }: SaveApiPromptProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/api_prompts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save the prompt");
  }

  revalidateTag("api-prompts");

  return await response?.json();
}
