"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { isStringEmpty } from "../utils/is-string-empty";
import { toast } from "react-toastify";
import { updateMember } from "./services/update-member";

export const NewMemberForm = () => {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const isDisabled = isStringEmpty(lastName) || isStringEmpty(firstName);

  const handleSave = async () => {
    try {
      await updateMember({ lastName, firstName });
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            onClick={handleSave}
            disabled={isDisabled}
            customClassName="w-full"
          />
        </div>
      </div>
    </div>
  );
};
