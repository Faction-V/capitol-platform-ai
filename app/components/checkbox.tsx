interface CheckboxProps {
  id: string;
  isChecked: boolean;
  onClick: () => void;
  label?: string;
}

export const Checkbox = ({ label, id, isChecked, onClick }: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        value=""
        defaultChecked={isChecked}
        onClick={onClick}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
