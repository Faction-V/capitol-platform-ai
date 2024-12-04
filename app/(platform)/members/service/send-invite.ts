"use server";

import { cookies } from "next/headers";

interface SendInviteProps {
  email: string;
  role?: string;
  canChooseRole?: boolean;
}

export async function sendInvite({
  email,
  role,
  canChooseRole,
}: SendInviteProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const body: SendInviteProps = {
    email,
  };

  if (canChooseRole) {
    body.role = role;
  }

  const response = await fetch(`${proxy}/org/member/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to send invite");
  }

  return await response?.json();
}
