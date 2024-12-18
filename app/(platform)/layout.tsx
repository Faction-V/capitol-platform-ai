import { headers } from "next/headers";
import { ReactNode } from "react";
import { Navigation } from "./navigation";
import { User } from "../types";
import { UserProvider } from "./UserProvider";

export default async function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
  const userString: string = headersList.get("user") || "";
  const user: User = JSON.parse(userString);

  return (
    <>
      <div className="flex overflow-hidden h-full">
        <Navigation user={user} />
        <div className="relative w-full h-full overflow-y-auto ml-64">
          <div className="flex p-6 w-full">
            <UserProvider user={user}>{children}</UserProvider>
          </div>
        </div>
      </div>
    </>
  );
}
