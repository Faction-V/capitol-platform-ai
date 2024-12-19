import { ChangeEvent, KeyboardEvent } from "react";

interface InputPros {
  id?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  customClassName?: string;
}

export const Input = ({
  id = "",
  name = "",
  placeholder = "",
  type = "text",
  onChange,
  onKeyDown,
  value,
  customClassName = "",
}: InputPros) => {
  return (
    <input
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
      onKeyDown={onKeyDown}
      className={`${customClassName} flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
    />
  );
};
