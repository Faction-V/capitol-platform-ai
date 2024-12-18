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

const defaultButtonClassnames =
  "flex justify-center items-center px-2.5 py-1.5 focus:ring-4 font-medium rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none";

const primaryButtonClassnames = `${defaultButtonClassnames} text-white bg-primary-800 hover:bg-primary-900 focus:ring-primary-300 text-center`;
const secondaryButtonClassnames = `${defaultButtonClassnames} text-primary-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-primary-950 focus:z-10 focus:ring-gray-100`;

const secondaryButtonWithIconClassnames = `${defaultButtonClassnames} font-medium bg-white border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-gray-100`;

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
      disabled={disabled || isLoading}
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
