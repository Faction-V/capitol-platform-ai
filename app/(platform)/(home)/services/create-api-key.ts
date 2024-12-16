"use server";

import { cookies } from "next/headers";

interface CreateApiKeysProps {
  name: string;
  domain: string;
}

export async function createApiKey({ name, domain }: CreateApiKeysProps) {
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
      domain: domain,
    }),
  });

  const responseJson = await response.json();

  console.log("responseJson", responseJson);

  if (!response.ok) {
    throw new Error("Failed to create api key");
  }

  return await response?.json();
}
