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
      const response = await updateMember({ lastName, firstName });
      //console.log("response", response);
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
      <div className="mb-3">
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
      <div className="mb-3">
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

      <Button label="Save" onClick={handleSave} disabled={isDisabled} />
    </div>
  );
};
