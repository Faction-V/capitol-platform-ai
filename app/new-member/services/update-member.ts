"use server";

import { cookies } from "next/headers";

interface UpdateMemberProps {
  lastName: string;
  firstName: string;
  id: string | undefined;
}

export async function updateMember({
  lastName,
  firstName,
  id,
}: UpdateMemberProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;

  const response = await fetch(`${proxy}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      lastName,
      firstName,
      id,
    }),
  });

  return await response?.json();
}
