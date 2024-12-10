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
      className={`${customClassName} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full px-4 py-2.5`}
    />
  );
};
