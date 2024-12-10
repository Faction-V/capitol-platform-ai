"use server";

import { cookies } from "next/headers";

export async function getAllApiKeys() {
  const cookieStore = await cookies();

  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org/key`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get the list of api keys");
  }

  return await response?.json();
}
