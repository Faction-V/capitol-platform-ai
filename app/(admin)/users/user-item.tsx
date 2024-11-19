import { EditIcon } from "@/app/icons/edit-icon";
import { TrashIcon } from "@/app/icons/trash-icon";
import { Button } from "@/app/components/button";

interface UserItemProps {
  firstName: string;
  lastName: string;
}

const colors: { [index: string]: string } = {
  a: "bg-red-300 text-red-950",
  b: "bg-orange-300 text-orange-950",
  c: "bg-amber-300 text-amber-950",
  d: "bg-yellow-300 text-yellow-950",
  e: "bg-lime-300 text-lime-950",
  f: "bg-zinc-300 text-zinc-950",
  g: "bg-green-300 text-green-950",
  h: "bg-emerald-300 text-emerald-950",
  i: "bg-teal-300 text-teal-950",
  j: "bg-cyan-300 text-cyan-950",
  k: "bg-sky-300 text-sky-950",
  l: "bg-blue-300 text-blue-950",
  m: "bg-indigo-300 text-indigo-950",
  n: "bg-violet-300 text-violet-950",
  o: "bg-purple-300 text-purple-950",
  p: "bg-fuchsia-300 text-fuchsia-950",
  q: "bg-pink-300 text-pink-950",
  r: "bg-rose-300 text-rose-950",
  s: "bg-slate-300 text-slate-950",
  t: "bg-gray-300 text-gray-950",
  u: "bg-neutral-300 text-neutral-950",
  v: "bg-teal-300 text-teal-950",
  w: "bg-blue-300 text-blue-950",
  x: "bg-green-300 text-green-950",
  y: "bg-emerald-300 text-emerald-950",
  z: "bg-amber-300 text-amber-950",
};

export const UserItem = ({
  firstName = "Masha",
  lastName = "Mal",
}: UserItemProps) => {
  const colorClassname = colors[lastName[0].toLowerCase()];

  return (
    <div className="flex bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
      <div className="flex gap-3">
        <div
          className={`w-10 h-10 rounded-full ${colorClassname} flex items-center justify-center self-center`}
        >
          {firstName[0].toUpperCase()}
          {lastName[0].toUpperCase()}
        </div>
        <div className="flex flex-col justify-between leading-normal">
          <h5 className="font-bold tracking-tight text-gray-900">
            {firstName} {lastName}
          </h5>
          <p className="font-normal text-gray-700">Role</p>
        </div>
      </div>

      <div className="flex gap-2 items-start">
        <Button label={<EditIcon />} type="secondary" onClick={() => {}} />
        <Button label={<TrashIcon />} type="secondary" onClick={() => {}} />
      </div>
    </div>
  );
};
