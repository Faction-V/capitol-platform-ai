import { ChangeEvent, KeyboardEvent } from "react";

interface TextareaPros {
  placeholder?: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  value: string;
  customClassName?: string;
}

export const Textarea = ({
  placeholder = "",
  onChange,
  onKeyDown,
  value,
  customClassName = "",
}: TextareaPros) => {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        onChange(event.target.value)
      }
      onKeyDown={(event) => onKeyDown && onKeyDown(event)}
      className={`${customClassName} flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
    />
  );
};
