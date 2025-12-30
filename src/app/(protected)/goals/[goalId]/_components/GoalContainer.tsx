"use client";

import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import GoalHeader from "./GoalHeader";
import GoalProgressCard from "./GoalProgressCard";
import GoalNotesCard from "./GoalNotesCard";
import Goal from "./Goal";
import { useAuthStore } from "@/store/useAuthStore";
import { calcProgress } from "../_utils/calcProgress";
import { useTodosSuspense } from "@/hooks/queries/todos/useTodosSuspense";
import { useGoalListSuspense } from "@/hooks/queries/goals/useGoalListSuspense";
import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";

type DataIdProps = {
  goalId: string;
};

export default function GoalContainer({ goalId }: DataIdProps) {
  const nickname = useAuthStore((state) => state.user?.name ?? "");
  const goalList = useGoalListSuspense();
  const todos = useTodosSuspense();

  const goals = goalList?.data.goals || [];
  const goal = goals.find((goal) => goal.id === Number(goalId));

  const goalTodos = todos.filter((goalTodo) => goalTodo.goal?.id === goal?.id);
  const progress = calcProgress(goalTodos);

  const targetTodoId = goalTodos.length > 0 ? goalTodos[0].id : null;
  return (
    <section>
      <PageHeader
        title={`${nickname} 목표`}
        desktopClassName="sm:mb-8.5"
      />

      <div className="mb-7.5 block w-full sm:grid lg:mb-20 lg:grid-cols-1 lg:gap-x-0 xl:gap-x-8 2xl:grid-cols-2">
        <AsyncBoundary loadingFallback={<div> 로딩중 </div>}>
          <GoalHeader goalId={goalId} />
        </AsyncBoundary>
        <div className="block sm:grid sm:grid-cols-2 sm:gap-x-5 lg:mt-5 lg:gap-x-5 xl:mt-5 xl:grid xl:grid-cols-2 2xl:mt-0">
          <AsyncBoundary loadingFallback={<div> 로딩중 </div>}>
            <GoalProgressCard percent={progress} />
          </AsyncBoundary>
          <GoalNotesCard
            goalId={goalId}
            todoId={`${targetTodoId}`}
          />
        </div>
      </div>
      <AsyncBoundary loadingFallback={<div> 로딩중 </div>}>
        <Goal goalTodos={goalTodos} />
      </AsyncBoundary>
    </section>
  );
}
