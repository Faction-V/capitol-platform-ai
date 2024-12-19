import { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  keyPrefix: string;
  header: string;
  selected: string;
  items: Array<SelectOption>;
  onClick: (value: string) => void;
}

export const Select = ({
  items,
  header,
  selected,
  keyPrefix,
  onClick,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const visibility = isOpen ? "opacity-100" : "opacity-0";

  return (
    <div className="w-1/2">
      <label
        id="listbox-label"
        className="block text-sm/6 font-medium text-gray-900"
      >
        {header}
      </label>
      <div className="relative mt-2">
        <button
          type="button"
          className="grid w-full h-9 cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-1 focus:-outline-offset-2 focus:outline-zinc-400 sm:text-sm/6"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{selected}</span>
          </span>
          <svg
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <ul
          className={`${visibility} absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`}
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {items.map((item: SelectOption) => {
            const checked = item.value === selected;
            const checkClassname = checked ? "text-primary-800" : "color-white";

            return (
              <li
                key={`${keyPrefix}-${item.value}`}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                id="listbox-option-0"
                role="option"
                onClick={() => {
                  onClick(item.value);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`${checkClassname} absolute inset-y-0 right-0 flex items-center pr-4`}
                >
                  <svg
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
