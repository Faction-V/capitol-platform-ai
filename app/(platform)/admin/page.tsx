import { OrganizationsList } from "./organizations-list";
import { getAllOrganizations } from "./services/get-all-organizations";

export default async function AdminPage({}) {
  let result = [];

  try {
    result = await getAllOrganizations();
  } catch (error) {
    console.error("Failed to get the list of api keys", error);
  }

  return <OrganizationsList organizations={result?.organizations} />;
}
