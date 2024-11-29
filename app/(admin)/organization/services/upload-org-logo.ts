"use server";

import { cookies } from "next/headers";

// interface UpdateOrgNameProps {
//   formData: File;
// }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export async function updateOrgLogo({ formData }) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  console.log("formData", formData);

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
