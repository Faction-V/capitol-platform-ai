interface RadioButtonProps {
  id: string;
  checked: boolean;
  label: string;
  value: string;
  onChange: () => void;
}

export const RadioButton = ({
  checked,
  id,
  value,
  label,
  onChange,
}: RadioButtonProps) => {
  return (
    <div className="flex items-center mb-4">
      <input
        checked={checked}
        onChange={onChange}
        id={id}
        type="radio"
        value={value}
        className="accent-primary-700 w-4 h-4  bg-gray-100 border-gray-300 cursor-pointer"
      />
      <label
        htmlFor={id}
        className="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};
