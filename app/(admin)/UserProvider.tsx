"use client";

import { useContext, createContext, ReactNode } from "react";
import { User } from "../types";

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider = ({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};
