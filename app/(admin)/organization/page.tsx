import { OrganizationName } from "./organization-name";
import { OrganizationLogo } from "./organization-logo";

export default async function OrganizationPage() {
  return (
    <div className="mb-4">
      <div className="flow-root">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">Organization settings</h3>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <OrganizationName />
        <OrganizationLogo />
      </div>
    </div>
  );
}
