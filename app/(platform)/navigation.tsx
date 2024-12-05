"use client";

import Link from "next/link";
import { ExternalLinkIcon } from "../icons/external-link-icon";
import { usePathname } from "next/navigation";
import { KeyIcon } from "../icons/key-icon";
import { UsersIcon } from "../icons/users-icon";
import { SettingsIcon } from "../icons/settings-icon";
import { EditIcon } from "../icons/edit-icon";
import { CodeBrowserIcon } from "../icons/code-browser-icon";

interface NavigationProps {
  isAdmin: boolean;
}

export const Navigation = ({ isAdmin }: NavigationProps) => {
  const pathname = usePathname();

  const linkClassNames =
    "flex gap-2 my-0.5 items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group";
  const selectedLinkClassNames =
    "flex gap-2 my-0.5 items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group";

  return (
    <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 transition-width">
      <div className="relative flex flex-col flex-1 min-h-0 pt-5 bg-white border-r border-gray-200">
        <div className="flex-1 px-3 bg-white">
          <Link
            href="/"
            className={
              pathname === "/" ? selectedLinkClassNames : linkClassNames
            }
          >
            <KeyIcon size={20} />
            API keys
          </Link>
          <Link
            href="/members"
            className={
              pathname === "/members" ? selectedLinkClassNames : linkClassNames
            }
          >
            <UsersIcon size={20} />
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
            <SettingsIcon />
            Organization settings
          </Link>
          <Link
            href="/prompts"
            className={
              pathname === "/prompts" ? selectedLinkClassNames : linkClassNames
            }
          >
            <EditIcon size={20} />
            Suggested prompts
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className={
                pathname === "/admin" ? selectedLinkClassNames : linkClassNames
              }
            >
              <CodeBrowserIcon size={20} />
              Admin panel
            </Link>
          )}
          <div className="h-px my-4 bg-gray-200" />
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
