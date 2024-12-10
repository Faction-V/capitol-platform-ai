"use server";

import { cookies } from "next/headers";

export async function getOrgInfo() {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve the organization information");
  }

  return await response?.json();
}
