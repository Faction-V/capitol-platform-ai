"use server";

import { cookies } from "next/headers";

export async function createOrganization(name: string) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      name: name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create organization");
  }

  return await response?.json();
}
