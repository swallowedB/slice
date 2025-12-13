"use client";

import EmptyState from "@/components/common/empty-state/EmptyState";
import GoalCard from "./GoalCard";
import { EMPTY_MESSAGES } from "@/constants/messages";
import { useTodoList } from "../../../_hooks/useTodoList";
import { useState } from "react";
import { useGoalList } from "@/hooks/queries/goals";

const cardStyles =
  "relative mt-4 rounded-[28px] bg-white px-4 py-6.5 pb-11 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] transition-all sm:p-4 sm:pt-7.5 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]";

export default function Goal() {
  const { todos } = useTodoList();
  const { data } = useGoalList();

  const [openCards, setOpenCards] = useState<Record<number, boolean>>({});
  const onToggleCard = (id: number) => {
    setOpenCards((prev) => {
      const current = prev[id];

      if (current === undefined) {
        return { ...prev, [id]: false };
      }

      return { ...prev, [id]: !current };
    });
  };

  const hasNoGoals = !data || data.goals.length === 0;
  return (
    <section>
      <h3 className="mb-3 pl-2 text-lg font-medium">목표별 할 일</h3>

      {hasNoGoals && (
        <div className="rounded-[28px] bg-white p-4 shadow">
          <EmptyState>{EMPTY_MESSAGES.GOAL.RECENT}</EmptyState>
        </div>
      )}
      {data?.goals?.map((goal) => {
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
    </section>
  );
}
