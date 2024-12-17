import { colors } from "./colors";

interface AvatarProps {
  firstName: string;
  lastName: string;
}

export const Avatar = ({ firstName, lastName }: AvatarProps) => {
  const colorClassname = colors[lastName[0].toLowerCase()];

  return (
    <div
      className={`w-8 h-8 rounded-lg ${colorClassname} flex items-center justify-center self-center`}
    >
      {firstName[0].toUpperCase()}
      {lastName[0].toUpperCase()}
    </div>
  );
};
