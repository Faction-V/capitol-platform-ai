"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getOtp } from "@/app/login/services/get-otp";
import { validateOtp } from "@/app/login/services/validate-otp";
import { Input } from "@/app/components/input";
import { Button } from "@/app/components/button";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const router = useRouter();

  const buttonLabel = isOtpVisible ? "Log in" : "Get OTP code";

  const handleButtonClick = async () => {
    if (isOtpVisible) {
      if (!email || !code) {
        return;
      }

      await validateOtp({ email, code });
      router.push("/");
    } else {
      if (!email) {
        return;
      }

      await getOtp(email);
      setIsOtpVisible(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <div className="flex flex-col gap-4">
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
      <Button label={buttonLabel} onClick={handleButtonClick} />
    </div>
  );
};
