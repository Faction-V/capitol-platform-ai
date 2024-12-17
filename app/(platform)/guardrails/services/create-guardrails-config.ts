"use server";

import { cookies } from "next/headers";

interface CreateGuardrailsConfigProps {
  name: string;
  description: string;
  passCriteria: string;
  failCriteria: string;
  examples: string;
  active: boolean;
}

export async function createGuardrailsConfig({
  name,
  examples,
  description,
  passCriteria,
  failCriteria,
}: CreateGuardrailsConfigProps) {
  const cookieStore = await cookies();

  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/configs/guardrails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      name,
      examples,
      description,
      passCriteria,
      failCriteria,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Guardrails configs");
  }

  return await response?.json();
}
