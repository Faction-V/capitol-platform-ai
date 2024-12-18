"use client";

import { Button } from "../components/button";
import { signOut } from "../services/sign-out";
import { SignOutIcon } from "../icons/sign-out-icon";

export const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <Button
      label={<SignOutIcon />}
      onClick={handleSignOut}
      type="secondary"
      customClassName="ml-auto"
    />
  );
};
