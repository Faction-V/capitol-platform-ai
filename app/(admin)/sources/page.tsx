import { NpmIcon } from "@/app/icons/npm-icon";
import { FileIcon } from "@/app/icons/file-icon";

export default function SourcesPage() {
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="flow-root">
        <h3 className="text-xl font-semibold dark:text-white">Useful links</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FileIcon />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-base font-semibold text-gray-900 truncate">
                  API docs
                </span>
                <a
                  href="https://api.capitol.ai/"
                  target="_blank"
                  className="block text-sm font-normal truncate text-sky-700 hover:underline"
                >
                  https://api.capitol.ai/
                </a>
              </div>
            </div>
          </li>
          <li className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <NpmIcon />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-base font-semibold text-gray-900 truncate">
                  NPM package with components
                </span>
                <a
                  href="https://www.npmjs.com/package/@capitol.ai/react"
                  target="_blank"
                  className="block text-sm font-normal truncate text-sky-700 hover:underline"
                >
                  https://www.npmjs.com/package/@capitol.ai/react
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
