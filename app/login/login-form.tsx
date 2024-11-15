"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getOtp } from "@/app/login/services/get-otp";
import { validateOtp } from "@/app/login/services/validate-otp";

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
        <input
          value={code}
          placeholder="Code"
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
        />
      ) : (
        <input
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
        />
      )}
      <button
        onClick={handleButtonClick}
        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {buttonLabel}
      </button>
    </div>
  );
};
