import { OrganizationName } from "./organization-name";
import { OrganizationLogo } from "./organization-logo";
import { getOrgInfo } from "./services/get-org-info";
import { getModels } from "./services/get-models";
import { OrganizationModels } from "./organization-models";

export default async function OrganizationPage() {
  let result = null;
  let models = [];
  let mappedModels = [];

  try {
    result = await getOrgInfo();
  } catch (error) {
    console.error("Failed to get the list of prompts", error);
  }

  try {
    models = await getModels();
    mappedModels = models.map((model: string) => ({
      value: model,
      label: model,
    }));
    console.log(result);
  } catch (error) {
    console.error("Failed to get the list of prompts", error);
  }

  const logoUrl = result?.organization?.imageUrl;
  const name = result?.organization?.name;

  return (
    <div className="mb-4 w-full">
      <div className="flow-root">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">Organization settings</h3>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <OrganizationName orgName={name} />
        <OrganizationLogo logoUrl={logoUrl} />
        <OrganizationModels models={mappedModels} />
      </div>
    </div>
  );
}
