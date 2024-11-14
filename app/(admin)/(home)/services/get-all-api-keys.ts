"use server";

import { cookies } from "next/headers";

export async function getAllApiKeys() {
  const cookieStore = await cookies();

  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(
    `${proxy}/org/key?organization-id=2360ebf5-bc9c-46a4-82db-a1bfad317ea7`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    },
  );

  return await response?.json();
}
