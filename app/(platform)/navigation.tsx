"use client";

import Link from "next/link";
import { ExternalLinkIcon } from "../icons/external-link-icon";
import { usePathname } from "next/navigation";
import { KeyIcon } from "../icons/key-icon";
import { UsersIcon } from "../icons/users-icon";
import { SettingsIcon } from "../icons/settings-icon";
import { EditIcon } from "../icons/edit-icon";
import { CodeBrowserIcon } from "../icons/code-browser-icon";
import { ShieldIcon } from "../icons/shield-icon";
import { CapitolIcon } from "../icons/capitol-icon";
import { SignOutButton } from "./sign-out-button";
import { User } from "../types";
import { Avatar } from "../components/avatar";

interface NavigationProps {
  user: User;
}

export const Navigation = ({ user }: NavigationProps) => {
  const pathname = usePathname();

  const linkClassNames =
    "flex gap-2 items-center p-2 text-base text-gray-900 rounded-lg hover:bg-zinc-100 group";
  const selectedLinkClassNames =
    "flex gap-2 bg-zinc-100 items-center p-2 text-base text-gray-900 rounded-lg hover:bg-zinc-100 group";

  return (
    <aside className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full font-normal duration-75 transition-width">
      <div className="relative flex flex-col flex-1 min-h-0 bg-zinc-50 border-r border-gray-200 p-2">
        <div
          data-sidebar="sidebar"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow"
        >
          <div data-sidebar="header" className="flex gap-2 p-2 items-center">
            {user?.orgLogo ? (
              <img
                src={user?.orgLogo}
                alt=""
                className="h-10 w-10 object-cover rounded-md"
              />
            ) : (
              <CapitolIcon />
            )}

            <span className="font-semibold">{user?.orgName}</span>
          </div>
          <div
            data-sidebar="content"
            className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-auto pt-2"
          >
            <Link
              prefetch={false}
              href="/"
              className={
                pathname === "/" ? selectedLinkClassNames : linkClassNames
              }
            >
              <KeyIcon size={20} />
              API keys
            </Link>
            <Link
              prefetch={false}
              href="/members"
              className={
                pathname === "/members"
                  ? selectedLinkClassNames
                  : linkClassNames
              }
            >
              <UsersIcon size={20} />
              Members
            </Link>
            <Link
              prefetch={false}
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
            {user?.isOwner && (
              <Link
                prefetch={false}
                href="/prompts"
                className={
                  pathname === "/prompts"
                    ? selectedLinkClassNames
                    : linkClassNames
                }
              >
                <EditIcon size={20} />
                Suggested prompts
              </Link>
            )}
            <Link
              prefetch={false}
              href="/guardrails"
              className={
                pathname === "/guardrails"
                  ? selectedLinkClassNames
                  : linkClassNames
              }
            >
              <ShieldIcon size={20} />
              Guardrails
            </Link>
            {user?.isAdmin && (
              <Link
                prefetch={false}
                href="/admin"
                className={
                  pathname === "/admin"
                    ? selectedLinkClassNames
                    : linkClassNames
                }
              >
                <CodeBrowserIcon size={20} />
                Admin panel
              </Link>
            )}
            <div className="h-px my-2 bg-gray-200" />
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

          <div data-sidebar="footer" className="flex gap-2 p-2 items-center">
            <Avatar firstName={user?.firstName} lastName={user?.lastName} />
            <div className="flex flex-col text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>
    </aside>
  );
};
