"use server";

interface CreateApiKeysProps {
  name: string;
  domain: string;
}

export async function createApiKeys({ name, domain }: CreateApiKeysProps) {
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/integration/key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      domain: "https://example.com",
      name: name,
    }),
  });

  return await response?.json();
}
