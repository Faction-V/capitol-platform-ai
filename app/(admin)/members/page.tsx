import MembersList from "./members-list";
import { getAllMembers } from "./service/get-all-members";

export default async function MembersPage() {
  let result = [];

  try {
    result = await getAllMembers();
  } catch (error) {
    console.error("Failed to get the list of api keys", error);
  }

  return <MembersList members={result} />;
}
