import { OrganizationName } from "./organization-name";
import { OrganizationLogo } from "./organization-logo";
import { getOrgInfo } from "./services/get-org-info";

export default async function OrganizationPage() {
  let result = null;

  try {
    result = await getOrgInfo();
  } catch (error) {
    console.error("Failed to get the list of prompts", error);
  }

  const logoUrl = result?.organization?.imageUrl;
  const name = result?.organization?.name;

  return (
    <div className="mb-4">
      <div className="flow-root">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">Organization settings</h3>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <OrganizationName orgName={name} />
        <OrganizationLogo logoUrl={logoUrl} />
      </div>
    </div>
  );
}
