"use server";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";

export async function signOut() {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/user/sign-out`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to sign out");
  }

  await response.json();

  cookieStore.delete("gofapi");
  cookieStore.delete("user");
  redirect("/login");
}
