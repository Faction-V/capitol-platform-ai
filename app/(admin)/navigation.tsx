"use client";

import Link from "next/link";
import { ExternalLinkIcon } from "../icons/external-link-icon";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  const linkClassNames =
    "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700";
  const selectedLinkClassNames =
    "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700  bg-gray-100 dark:bg-gray-700";

  return (
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
            href="/members"
            className={
              pathname === "/members" ? selectedLinkClassNames : linkClassNames
            }
          >
            Members
          </Link>
          <Link
            href="/organization"
            className={
              pathname === "/organization"
                ? selectedLinkClassNames
                : linkClassNames
            }
          >
            Organization settings
          </Link>
          <Link
            href="/prompts"
            className={
              pathname === "/prompts" ? selectedLinkClassNames : linkClassNames
            }
          >
            Suggested prompts
          </Link>
          <a
            rel="noopener noreferrer"
            href="https://api.capitol.ai/"
            target="_blank"
            className={linkClassNames}
          >
            <span className="gap-1 flex">
              API docs <ExternalLinkIcon size={12} />
            </span>
          </a>
          <a
            rel="noopener noreferrer"
            href="https://www.npmjs.com/package/@capitol.ai/react"
            target="_blank"
            className={linkClassNames}
          >
            <span className="gap-1 flex">
              NPM package <ExternalLinkIcon size={12} />
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
};
