"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { isEmptyString } from "../utils/is-empty-string";
import { toast } from "react-toastify";
import { updateMember } from "./services/update-member";
import { User } from "../types";
import { useUser } from "../(platform)/UserProvider";

export const NewMemberForm = () => {
  const user: User | undefined = useUser();
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = isEmptyString(lastName) || isEmptyString(firstName);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateMember({
        lastName,
        firstName,
        id: user?.id,
      });
      router.push("/");
    } catch (error) {
      console.error("error", error);
      toast.error("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-center p-5 mb-2 flex-col gap-4">
        <div className="flex flex-col items-center w-80">
          <h3 className="text-xl font-semibold mb-6">Add info about you</h3>
          <div className="mb-3 w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First name
            </label>
            <Input
              onChange={(value: string) => setFirstName(value)}
              onKeyDown={handleKeyDown}
              value={firstName}
              type="text"
              id="first_name"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last name
            </label>
            <Input
              onChange={(value: string) => setLastName(value)}
              onKeyDown={handleKeyDown}
              value={lastName}
              type="text"
              id="last_name"
            />
          </div>
          <Button
            label="Save"
            isLoading={isLoading}
            onClick={handleSave}
            disabled={isDisabled}
            customClassName="w-full"
          />
        </div>
      </div>
    </div>
  );
};
