"use server";
import { cookies } from "next/headers";

interface ValidateOtpProps {
  email: string;
  code: string;
}

export async function validateOtp({ email, code }: ValidateOtpProps) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const response = await fetch(`${proxy}/user/otp/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email?.toLowerCase(),
      code: code,
    }),
  });

  const responseData = await response?.json();

  cookieStore.set(responseData?.cookieName, responseData?.cookie);
}
