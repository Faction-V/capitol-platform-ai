"use server";

interface UpdateMemberProps {
  lastName: string;
  firstName: string;
}

export async function updateMember({ lastName, firstName }: UpdateMemberProps) {
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lastName,
      firstName,
    }),
  });

  return await response?.json();
}
