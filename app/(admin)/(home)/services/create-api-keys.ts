"use server";

interface CreateApiKeysProps {
  name: string;
}

export async function createApiKeys({ name }: CreateApiKeysProps) {
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/integration/key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      domain: "capitol-client.com",
    }),
  });

  return await response?.json();
}
