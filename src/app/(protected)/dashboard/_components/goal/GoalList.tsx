"use client";
import EmptyState from "@/components/common/empty-state/EmptyState";
import { EMPTY_MESSAGES } from "@/constants/messages";
import { useGoalsSuspense } from "@/hooks/queries/goals/useGoalsSuspense";
import { useTodosSuspense } from "@/hooks/queries/todos/useTodosSuspense";
import { useState } from "react";
import GoalCard from "./GoalCard";
import { cardStyles } from "./Goal";

export default function GoalList() {
  const todos = useTodosSuspense();
  const data = useGoalsSuspense();

  const [openCards, setOpenCards] = useState<Record<number, boolean>>({});

  const onToggleCard = (id: number) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  if (data.goals.length === 0) {
    return (
      <div className="rounded-[28px] bg-white p-4 shadow">
        <EmptyState>{EMPTY_MESSAGES.GOAL.RECENT}</EmptyState>
      </div>
    );
  }

  return (
    <>
      {data.goals.map((goal) => {
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
    </>
  );
}
