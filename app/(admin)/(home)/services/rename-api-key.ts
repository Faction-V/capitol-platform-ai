"use server";

import { cookies } from "next/headers";

interface RenameApiKeyProps {
  id: string;
  name: string;
}

export async function renameApiKey({ id, name }: RenameApiKeyProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org/key?api-key-id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",

      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      name: name,
      "api-key-id": id,
      domain: "test.capitol.ai",
    }),
  });

  return await response?.json();
}
