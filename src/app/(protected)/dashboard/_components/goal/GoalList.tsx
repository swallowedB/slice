"use client";
import EmptyState from "@/components/common/empty-state/EmptyState";
import { EMPTY_MESSAGES } from "@/constants/messages";
import { useTodosSuspense } from "@/hooks/queries/todos/useTodosSuspense";
import { useGoalsInfiniteQuery } from "@/hooks/queries/goals/useGoalsInfiniteQuery";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import GoalCard from "./GoalCard";
import { cardStyles } from "./Goal";

export default function GoalList() {
  const todos = useTodosSuspense();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGoalsInfiniteQuery();

  const { ref, inView } = useInView();

  const [openCards, setOpenCards] = useState<Record<number, boolean>>({});

  const onToggleCard = (id: number) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const goals = data?.pages.flatMap((page) => page.goals) ?? [];

  if (goals.length === 0) {
    return (
      <div className="rounded-[28px] bg-white p-4 shadow">
        <EmptyState>{EMPTY_MESSAGES.GOAL.RECENT}</EmptyState>
      </div>
    );
  }
  return (
    <>
      {goals.map((goal) => {
        const goalTodos = todos.filter((todo) => todo.goal?.id === goal.id);

        const todoItems = goalTodos.filter((t) => !t.checked);
        const doneItems = goalTodos.filter((t) => t.checked);

        const percent =
          goalTodos.length === 0
            ? 0
            : Math.floor((doneItems.length / goalTodos.length) * 100);

        return (
          <GoalCard
            key={goal.id}
            title={goal.title}
            percent={percent}
            todoItems={todoItems}
            doneItems={doneItems}
            isOpen={openCards[goal.id] ?? true}
            onToggle={() => onToggleCard(goal.id)}
            cardStyles={cardStyles}
          />
        );
      })}

      {!isFetchingNextPage && hasNextPage && (
        <div
          ref={ref}
          style={{ height: "1px" }}
        />
      )}

      {isFetchingNextPage && (
        <p className="py-5 text-center text-gray-500">불러오는 중…</p>
      )}
      {!hasNextPage && (
        <p className="py-5 text-center text-gray-500">
          모든 목표를 불러왔습니다.
        </p>
      )}
    </>
  );
}
