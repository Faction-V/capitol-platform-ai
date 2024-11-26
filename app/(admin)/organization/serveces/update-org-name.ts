"use server";

import { cookies } from "next/headers";

interface UpdateOrgNameProps {
  name: string;
}

export async function updateOrgName({ name }: UpdateOrgNameProps) {
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
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update the organization name");
  }

  return await response?.json();
}
