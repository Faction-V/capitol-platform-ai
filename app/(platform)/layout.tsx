import { headers } from "next/headers";
import { ReactNode } from "react";
import { CapitolIcon } from "@/app/icons/capitol-icon";
import { SignOutButton } from "./sign-out-button";
import { Navigation } from "./navigation";
import { User } from "../types";

export default async function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
  const userString: string = headersList.get("user") || "";
  const user: User = JSON.parse(userString);

  const logo = user?.orgLogo;
  const name = user?.orgName || "Capitol Platform";
  const isAdmin: boolean = user?.isAdmin;

  return (
    <>
      <nav className="fixed z-30 w-full bg-white border-b border-gray-200 flex items-center p-3 justify-between">
        <div className="flex gap-2 items-center">
          {logo ? (
            <img
              src={logo}
              alt=""
              className="h-10 w-10 object-cover rounded-md"
            />
          ) : (
            <CapitolIcon />
          )}

          <span className="font-medium text-lg">{name}</span>
        </div>
        <div className="flex items-center gap-4 font-medium">
          <div>
            {user?.firstName} {user?.lastName}
          </div>
          <SignOutButton />
        </div>
      </nav>
      <div className="flex pt-16 overflow-hidden bg-gray-50 h-full">
        <Navigation isAdmin={isAdmin} />
        <div className="relative w-full h-full overflow-y-auto bg-gray-50 ml-64">
          <div className="flex p-6 w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
