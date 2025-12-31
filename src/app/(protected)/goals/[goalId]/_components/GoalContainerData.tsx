"use client";

import GoalHeader from "./GoalHeader";
import GoalProgressCard from "./GoalProgressCard";
import GoalNotesCard from "./GoalNotesCard";
import Goal from "./Goal";
import { calcProgress } from "../_utils/calcProgress";
import { useTodosSuspense } from "@/hooks/queries/todos/useTodosSuspense";
import { useGoalListSuspense } from "@/hooks/queries/goals/useGoalListSuspense";

type DataIdProps = {
  goalId: string;
};

export default function GoalContainerData({ goalId }: DataIdProps) {
  const goalList = useGoalListSuspense();
  const todos = useTodosSuspense();

  const goals = goalList?.data.goals || [];
  const goal = goals.find((goal) => goal.id === Number(goalId));

  const goalTodos = todos.filter((goalTodo) => goalTodo.goal?.id === goal?.id);
  const progress = calcProgress(goalTodos);

  const targetTodoId = goalTodos.length > 0 ? goalTodos[0].id : null;
  return (
    <>
      <div className="mb-7.5 block w-full sm:grid lg:mb-20 lg:grid-cols-1 lg:gap-x-0 xl:gap-x-8 2xl:grid-cols-2">
        <GoalHeader goalId={goalId} />
        <div className="block sm:grid sm:grid-cols-2 sm:gap-x-5 lg:mt-5 lg:gap-x-5 xl:mt-5 xl:grid xl:grid-cols-2 2xl:mt-0">
          <GoalProgressCard percent={progress} />
          <GoalNotesCard
            goalId={goalId}
            todoId={`${targetTodoId}`}
          />
        </div>
      </div>
      <Goal goalTodos={goalTodos} />
    </>
  );
}
