"use server";

import { cookies } from "next/headers";

interface SavePromptProps {
  prompt: string;
}

export async function savePrompt({ prompt }: SavePromptProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/api_example_prompts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  console.log(response.ok);

  if (!response.ok) {
    throw new Error("Failed to save the prompt");
  }

  return await response?.json();
}
