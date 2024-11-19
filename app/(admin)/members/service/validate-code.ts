"use server";

import { cookies } from "next/headers";

interface ValidateCodeProps {
  email: string;
  code: string;
}

export async function validateCode({ email, code }: ValidateCodeProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org/member/invite/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      email,
      code,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to validate code");
  }

  return await response?.json();
}
