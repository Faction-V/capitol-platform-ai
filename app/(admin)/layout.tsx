"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CapitolIcon } from "@/app/icons/capitol-icon";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const linkClassNames =
    "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700";
  const selectedLinkClassNames =
    "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700  bg-gray-100 dark:bg-gray-700";

  return (
    <>
      <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex items-center p-4 gap-2">
        <CapitolIcon />
        <span className="font-medium text-lg">Capitol Platform</span>
      </nav>
      <div className="flex pt-16 overflow-hidden bg-gray-50 h-full">
        <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 transition-width">
          <div className="relative flex flex-col flex-1 min-h-0 pt-6 bg-white border-r border-gray-200">
            <div className="flex-1 px-3 space-y-1 bg-white">
              <Link
                href="/"
                className={
                  pathname === "/" ? selectedLinkClassNames : linkClassNames
                }
              >
                API keys
              </Link>
              <Link
                href="/sources"
                className={
                  pathname === "/sources"
                    ? selectedLinkClassNames
                    : linkClassNames
                }
              >
                Links to sources
              </Link>
            </div>
          </div>
        </aside>
        <div className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64">
          <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 h-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
