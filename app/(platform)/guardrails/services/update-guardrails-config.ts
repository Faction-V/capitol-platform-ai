"use server";

import { cookies } from "next/headers";

interface updateGuardrailsConfigsProps {
  id: string;
  name: string;
  description: string;
  passCriteria: string;
  failCriteria: string;
  examples: string;
  active: boolean;
}

export async function updateGuardrailsConfigs({
  id,
  name,
  examples,
  description,
  passCriteria,
  failCriteria,
  active,
}: updateGuardrailsConfigsProps) {
  const cookieStore = await cookies();

  console.log("data", {
    id,
    name,
    examples,
    description,
    passCriteria,
    failCriteria,
    active,
  });

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
      active,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Guardrails configs");
  }

  return await response?.json();
}
