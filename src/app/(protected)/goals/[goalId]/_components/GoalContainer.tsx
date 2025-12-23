"use client";

// import { useTodoList } from "@/app/(protected)/_hooks/useTodoList";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import { useGoalList } from "@/hooks/queries/goals";
import GoalHeader from "./GoalHeader";
import GoalProgressCard from "./GoalProgressCard";
import GoalNotesCard from "./GoalNotesCard";
import Goal from "./Goal";
import { useAuthStore } from "@/store/useAuthStore";
import { calcProgress } from "../_utils/calcProgress";
import { useTodosSuspense } from "@/hooks/queries/todos/useTodosSuspense";

type DataIdProps = {
  goalId: string;
};

export default function GoalContainer({ goalId }: DataIdProps) {
  const nickname = useAuthStore((state) => state.user?.name ?? "");
  const {
    data: goalData,
    isLoading: isGoalsLoading,
    isError: isGoalsError,
  } = useGoalList();
  //   const { todos, isLoading, isError } = useTodoList();
  const todos = useTodosSuspense();

  const goals = goalData?.goals || [];
  const goal = goals.find((g) => g.id === Number(goalId));

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
    </section>
  );
}
