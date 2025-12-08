import DashBoardPage from "../page";

export default async function Page({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  console.log("Page에서 받은 teamId:", teamId);
  return <DashBoardPage teamId={teamId} />;
}
