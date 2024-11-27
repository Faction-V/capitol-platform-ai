"use server";

import { cookies } from "next/headers";

interface UpdateOrgNameProps {
  formData: File;
}

export async function updateOrgLogo({ formData }: UpdateOrgNameProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;

  const response = await fetch(`${proxy}/org/logo`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Cookie: cookieStore.toString(),
    },

    body: formData,
  });

  console.log("response", response);

  if (!response.ok) {
    return await response?.text();
    //throw new Error("Failed to upload organization logo");
  }

  return await response?.json();
}
