import { headers } from "next/headers";
import { ReactNode } from "react";
import { User } from "../types";
import { UserProvider } from "../(platform)/UserProvider";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
  const userString: string = headersList.get("user") || "";
  const user: User = JSON.parse(userString);

  return <UserProvider user={user}>{children}</UserProvider>;
}
