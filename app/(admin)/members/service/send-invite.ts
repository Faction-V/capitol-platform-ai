"use server";

import { cookies } from "next/headers";

interface SendInviteProps {
  email: string;
}

export async function sendInvite({ email }: SendInviteProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org/member/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send invite");
  }

  return await response?.json();
}
