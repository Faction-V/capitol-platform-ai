"use server";

import { cookies } from "next/headers";

interface CreateApiKeysProps {
  name: string;
}

export async function createApiKey({ name }: CreateApiKeysProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org/key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      name: name,
      domain: "test.capitol.ai",
      organizationId: "2360ebf5-bc9c-46a4-82db-a1bfad317ea7",
    }),
  });

  return await response?.json();
}
