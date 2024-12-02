"use client";

import { Button } from "../components/button";
import { signOut } from "../services/sign-out";

export const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut();
  };
  return <Button label="Logout" onClick={handleSignOut} type="secondary" />;
};
