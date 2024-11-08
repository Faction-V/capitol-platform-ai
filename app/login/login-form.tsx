"use client";
import { useState } from "react";
import { getOtp } from "./get-otp";

export const LoginForm = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <input
        value={email}
        placeholder="Email"
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      <button
        onClick={() => getOtp(email)}
        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Get OTP code
      </button>
    </div>
  );
};
