import { headers } from "next/headers";
import { ReactNode } from "react";
import { CapitolIcon } from "@/app/icons/capitol-icon";
import { SignOutButton } from "./sign-out-button";
import { Navigation } from "./navigation";
import { UserProvider } from "./UserProvider";
import { User } from "../types";

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
      <nav className="fixed z-30 w-full bg-white border-b border-gray-200 flex items-center p-3 justify-between">
        <div className="flex gap-2 items-center">
          <CapitolIcon />
          <span className="font-medium text-lg">Capitol Platform</span>
        </div>
        <div className="flex items-center gap-4 font-medium">
          <div>
            {user?.firstName} {user?.lastName}
          </div>
          <SignOutButton />
        </div>
      </nav>
      <div className="flex pt-16 overflow-hidden bg-gray-50 h-full">
        <Navigation />
        <div className="relative w-full h-full overflow-y-auto bg-gray-50 ml-64">
          <div className="grid grid-cols-1 p-6 h-full">
            <UserProvider user={user}>{children}</UserProvider>
          </div>
        </div>
      </div>
    </>
  );
}
