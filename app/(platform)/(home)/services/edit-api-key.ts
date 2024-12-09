"use server";

import { cookies } from "next/headers";

interface EditApiKeyProps {
  id: string;
  name: string;
  domain: string;
}

export async function editApiKey({ id, name, domain }: EditApiKeyProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org/key`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",

      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      name: name,
      apiKeyId: id,
      domain: domain,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to rename the api key");
  }

  return await response?.json();
}
