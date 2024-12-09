"use server";

import { cookies } from "next/headers";

interface UpdateOrgNameProps {
  file: File;
}

export async function updateOrgLogo({ file }: UpdateOrgNameProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${proxy}/org/logo`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
    },

    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload organization logo");
  }

  return await response?.json();
}
