"use server";

import { cookies } from "next/headers";

interface SendInviteProps {
  organizationId?: string | null;
  email: string;
  role?: string;
  canChooseRole?: boolean;
}

interface BodyProps {
  email: string;
  role?: string;
  "organization-id"?: string | null;
}

export async function sendInvite({
  email,
  role,
  canChooseRole,
  organizationId,
}: SendInviteProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const body: BodyProps = {
    email,
  };

  if (canChooseRole) {
    body.role = role;
    body["organization-id"] = organizationId;
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
