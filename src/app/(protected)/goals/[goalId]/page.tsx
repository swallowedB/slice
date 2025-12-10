import GoalContainer from "./_components/GoalContainer";

export default function GoalsPage({ params }: { params: { goalId: number } }) {
  return <GoalContainer goalId={params.goalId} />;
}
