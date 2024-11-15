import { EditIcon } from "@/app/icons/edit-icon";
import { TrashIcon } from "@/app/icons/trash-icon";

interface UserItemProps {
  firstName: string;
  lastName: string;
}

const colors = {
  a: "red",
  b: "orange",
  c: "amber",
  d: "yellow",
  e: "lime",
  f: "zinc",
  g: "green",
  h: "emerald",
  i: "teal",
  j: "cyan",
  k: "sky",
  l: "blue",
  m: "indigo",
  n: "violet",
  o: "purple",
  p: "fuchsia",
  q: "pink",
  r: "rose",
  s: "slate",
  t: "gray",
  u: "neutral",
  v: "teal",
  w: "blue",
  x: "green",
  y: "emerald",
  z: "amber",
};

export const UserItem = ({
  firstName = "Masha",
  lastName = "Mal",
}: UserItemProps) => {
  return (
    <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
      <div className="flex">
        <div className={`w-10 h-10 rounded-full bg-amber-300`}>
          {firstName[0].toUpperCase()}
          {lastName[0].toUpperCase()}
        </div>
        <div className="flex flex-col justify-between leading-normal gap-2">
          <h5 className="font-bold tracking-tight text-gray-900">Name</h5>
          <p className="font-normal text-gray-700">Role</p>
        </div>
      </div>

      <div className="flex gap-2 items-start">
        <button
          onClick={() => {}}
          type="button"
          className="py-1.5 px-1.5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => {}}
          type="button"
          className="py-1.5 px-1.5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
