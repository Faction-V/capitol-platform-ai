"use server";

import { cookies } from "next/headers";

interface updateGuardrailsConfigsProps {
  id: string;
  name: string;
  description: string;
  passCriteria: string;
  failCriteria: string;
  examples: string;
}

export async function updateGuardrailsConfigs({
  id,
  name,
  examples,
  description,
  passCriteria,
  failCriteria,
}: updateGuardrailsConfigsProps) {
  const cookieStore = await cookies();

  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/configs/guardrails`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      id,
      name,
      examples,
      description,
      passCriteria,
      failCriteria,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Guardrails configs");
  }

  return await response?.json();
}
