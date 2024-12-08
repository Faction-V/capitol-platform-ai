"use server";

import { cookies } from "next/headers";

interface UpdateMemberProps {
  lastName: string;
  firstName: string;
}

export async function updateMember({ lastName, firstName }: UpdateMemberProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const id = cookieStore.get("user")?.value;

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
