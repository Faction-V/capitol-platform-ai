"use server";

import { cookies } from "next/headers";

interface RemoveMemberProps {
  id: string;
}

export async function removeMember({ id }: RemoveMemberProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/org/member?member-id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove member");
  }

  return await response?.json();
}
