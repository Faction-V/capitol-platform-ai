interface CheckboxProps {
  id: string;
  isChecked: boolean;
  disabled: boolean;
  onClick: () => void;
  label?: string;
}

export const Checkbox = ({
  label,
  id,
  isChecked,
  disabled,
  onClick,
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        disabled={disabled}
        id={id}
        type="checkbox"
        value=""
        defaultChecked={isChecked}
        onClick={onClick}
        className="w-4 h-4 text-zinc-900 bg-gray-100 border-gray-300 rounded cursor-pointer accent-zinc-900 disabled:cursor-not-allowed disabled:opacity-70"
      />
      {label && (
        <label
          htmlFor={id}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      )}
    </div>
  );
};
