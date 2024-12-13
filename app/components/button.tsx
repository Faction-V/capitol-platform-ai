import { MouseEvent, ReactNode } from "react";
import { Spinner } from "@/app/components/spinner";

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  label: string | ReactNode;
  customClassName?: string;
  type?: "primary" | "secondary";
  onClick: () => void;
}

const primaryButtonClassnames =
  "flex justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none";
const secondaryButtonClassnames =
  "flex px-2.5 justify-center py-1.5 text-sm font-medium text-primary-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-950 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none";

const secondaryButtonWithIconClassnames =
  "flex py-1.5 px-1.5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none";

export const Button = ({
  onClick,
  type = "primary",
  label,
  disabled = false,
  customClassName = "",
  isLoading = false,
}: ButtonProps) => {
  const buttonClassnames =
    type === "primary"
      ? primaryButtonClassnames
      : typeof label === "string"
        ? secondaryButtonClassnames
        : secondaryButtonWithIconClassnames;

  return (
    <button
      disabled={disabled}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick();
      }}
      type="button"
      className={`${buttonClassnames} ${customClassName}`}
    >
      {typeof label === "string" && isLoading && (
        <div className="flex gap-2">
          <Spinner /> {label}
        </div>
      )}
      {typeof label !== "string" && isLoading && <Spinner />}
      {!isLoading && label}
    </button>
  );
};
