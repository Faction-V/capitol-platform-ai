import { Dropzone } from "../../components/dropzone";

export const OrganizationLogo = () => {
  return (
    <div className="flex gap-2 flex-col bg-white border border-gray-200 rounded-lg shadow justify-between items-start p-5 mb-2">
      <div className="text-gray-900">Organisation logo</div>
      <Dropzone />
    </div>
  );
};
