"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

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
    throw new Error("Failed to generate prompts");
  }

  revalidateTag("api-prompts");

  return await response?.json();
}
