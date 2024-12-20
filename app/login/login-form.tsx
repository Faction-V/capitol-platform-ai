"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getOtp } from "@/app/login/services/get-otp";
import { validateOtp } from "@/app/login/services/validate-otp";
import { Input } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const buttonLabel = isOtpVisible ? "Log in" : "Get OTP code";

  const handleButtonClick = async () => {
    if (isOtpVisible) {
      // Validate OTP
      if (!email || !code) {
        return;
      }
      setIsLoading(true);

      try {
        await validateOtp({ email, code });
        router.push("/");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Something went wrong. Please try again");
      }
    } else {
      // Get OTP
      if (!email) {
        return;
      }
      setIsLoading(true);
      try {
        await getOtp(email);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Something went wrong. Please try again");
      }
      setIsLoading(false);
      setIsOtpVisible(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-center p-5 mb-2 flex-col gap-4">
        <div className="flex flex-col gap-6 items-center w-80">
          {isOtpVisible ? (
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold">Log in</h3>
              <p className="text-base text-gray-700">
                Enter the code you received on your email
              </p>
              <p className="text-sm text-gray-700 underline">{email}</p>
            </div>
          ) : (
            <h3 className="text-xl font-semibold">Log in</h3>
          )}

          {isOtpVisible ? (
            <Input
              value={code}
              placeholder="Code"
              onChange={(value: string) => setCode(value)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <Input
              name="email"
              value={email}
              placeholder="Email"
              type="email"
              onChange={(value: string) => setEmail(value)}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
        <Button
          isLoading={isLoading}
          label={buttonLabel}
          onClick={handleButtonClick}
          customClassName="w-full"
        />
      </div>
    </div>
  );
};
