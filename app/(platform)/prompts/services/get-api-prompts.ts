"use server";

import { cookies } from "next/headers";

export async function getApiPrompts() {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/api_prompts`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    next: { tags: ["api-prompts"] },
  });

  if (!response.ok) {
    throw new Error("Failed to get the list of prompts");
  }

  return await response?.json();
}
