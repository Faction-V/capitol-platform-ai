"use server";

import { cookies } from "next/headers";

interface CreateApiKeysProps {
  name: string;
}

export async function createApiKey({ name }: CreateApiKeysProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/integration/key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      name: name,
      domain: "capitol-client.com",
    }),
  });

  return await response?.json();
}
