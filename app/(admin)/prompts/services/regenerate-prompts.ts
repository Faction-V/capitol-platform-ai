"use server";

import { cookies } from "next/headers";

export async function regeneratePrompts() {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/api_prompts/org/regenerate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to generate the list of prompts");
  }

  return await response?.json();
}
