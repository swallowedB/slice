import GoalContainer from "./_components/GoalContainer";

export default async function GoalsPage({
  params,
}: {
  params: Promise<{ goalId: string }>;
}) {
  const { goalId } = await params;
  return <GoalContainer goalId={goalId} />;
}
