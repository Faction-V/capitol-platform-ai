"use server";

export async function getAllApiKeys() {
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(
    `${proxy}/org/key?organization-id=2360ebf5-bc9c-46a4-82db-a1bfad317ea7`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return await response?.json();
}
