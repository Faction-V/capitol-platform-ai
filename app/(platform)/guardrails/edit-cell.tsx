import { KeyboardEvent } from "react";
import { Textarea } from "../../components/textarea";

interface EditCellProps {
  value: string;
  isEditMode: boolean;
  updateValue: (value: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const EditCell = ({ value, isEditMode, updateValue }: EditCellProps) => {
  return (
    <td className="p-3 leading-tight border-r border-gray-200">
      {isEditMode ? <Textarea onChange={updateValue} value={value} /> : value}
    </td>
  );
};
