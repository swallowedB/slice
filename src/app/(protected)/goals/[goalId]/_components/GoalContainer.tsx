"use client";

import { useTodoList } from "@/app/(protected)/(dashboard)/_hooks/useTodoList";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import { useGoalList } from "@/hooks/queries/goals";
import GoalHeader from "./GoalHeader";
import GoalProgressCard from "./GoalProgressCard";
import GoalNotesCard from "./GoalNotesCard";
import Goal from "./Goal";

export default function GoalContainer({ goalId }: { goalId: string }) {
  const goalIdNum = Number(goalId);
  const {
    data: goalData,
    isLoading: isGoalsLoading,
    isError: isGoalsError,
  } = useGoalList();

  const { todos, isLoading, isError } = useTodoList();

  const goals = goalData?.goals || [];
  const goal = goals.find((g) => g.id === Number(goalId));

  const goalTodos = todos.filter((goalTodo) => goalTodo.goal?.id === goal?.id);
  const doneCount = goalTodos.filter((goalTodo) => goalTodo.checked).length;
  const totalCount = goalTodos.length;
  const progress =
    totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  console.log(todos);

  return (
    <>
      <PageHeader
        title={`체다치즈님의 목표`}
        desktopClassName="sm:mb-8.5"
      />

      {/* 목표 헤더 */}
      <section className="mb-7.5 w-full lg:mb-20">
        <div className="block w-full sm:grid lg:grid-cols-1 lg:gap-x-0 xl:gap-x-8 2xl:grid-cols-2">
          <GoalHeader
            title={`${goal?.title}`}
            onMenuClick={() => console.log("menu")}
          />

          <div className="block sm:grid sm:grid-cols-2 sm:gap-x-5 lg:mt-5 lg:gap-x-5 xl:mt-5 xl:grid xl:grid-cols-2 2xl:mt-0">
            <GoalProgressCard percent={progress} />
            <GoalNotesCard goalId={goalIdNum} />
          </div>
        </div>
      </section>
      <Goal goalTodos={goalTodos} />
    </>
  );
}
