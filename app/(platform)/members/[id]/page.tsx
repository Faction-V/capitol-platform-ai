import MembersList from "../members-list";
import { getAllMembersById } from "../service/get-all-members-by-id";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const memberId: string = (await params).id;

  let result = [];

  try {
    result = await getAllMembersById(memberId);
  } catch (error) {
    console.error("Failed to get the list of api keys", error);
  }

  return <MembersList members={result?.members} canChooseRole />;
}