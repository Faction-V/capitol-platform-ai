import { ChangeEvent, KeyboardEvent } from "react";

interface InputPros {
  id?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input = ({
  id = "",
  name = "",
  placeholder = "",
  type = "text",
  onChange,
  onKeyDown,
  value,
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
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
    />
  );
};
