"use client";

import EmptyState from "@/components/common/empty-state/EmptyState";
import GoalCard from "./GoalCard";
import { EMPTY_MESSAGES } from "@/constants/messages";
import { useTodoList } from "../../../_hooks/useTodoList";
import { ListGoalType } from "@/components/common/list/list-item/types";
import { useEffect, useState } from "react";

const cardStyles =
  "relative mt-4 rounded-[28px] bg-white px-4 py-6.5 pb-11 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] transition-all sm:p-4 sm:pt-7.5 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]";

export default function Goal() {
  const { todos } = useTodoList();

  const groupedGoals: ListGoalType[] = Object.values(
    todos.reduce(
      (acc, cur) => {
        const goal = cur.goal!;
        if (!acc[goal.id]) {
          acc[goal.id] = {
            id: goal.id,
            title: goal.title,
            todos: [],
          };
        }
        acc[goal.id].todos.push(cur);
        return acc;
      },
      {} as Record<number, ListGoalType>,
    ),
  );
  const goalGroups = Object.values(groupedGoals);

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

  return (
    <section>
      <h3 className="mb-3 pl-2 text-lg font-medium">목표별 할 일</h3>

      {goalGroups.length === 0 ? (
        <div className="rounded-[28px] bg-white p-4 shadow">
          <EmptyState>{EMPTY_MESSAGES.GOAL.RECENT}</EmptyState>
        </div>
      ) : (
        goalGroups.map((group) => {
          const todoItems = group.todos.filter((t) => !t.checked);
          const doneItems = group.todos.filter((t) => t.checked);

          const percent =
            group.todos.length === 0
              ? 0
              : Math.floor((doneItems.length / group.todos.length) * 100);

          return (
            <GoalCard
              key={group.id}
              title={group.title}
              percent={percent}
              todoItems={todoItems}
              doneItems={doneItems}
              isOpen={openCards[group.id] ?? true}
              onToggle={() => onToggleCard(group.id)}
              cardStyles={cardStyles}
            />
          );
        })
      )}
    </section>
  );
}
