"use server";

export async function getOtp(email: string) {
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/user/otp/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email?.toLowerCase(),
    }),
  });

  const responseData = await response?.json();

  console.log("responseData", responseData);
}
