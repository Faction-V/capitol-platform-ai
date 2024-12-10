"use server";

import { cookies } from "next/headers";

export async function deleteGuardrailsConfig(id: string) {
  const cookieStore = await cookies();

  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/configs/guardrails?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete Guardrails configs");
  }

  return await response?.json();
}
