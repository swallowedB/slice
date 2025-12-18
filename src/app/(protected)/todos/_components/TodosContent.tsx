"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import GoalSelect from "./GoalSelect";
import ListItem from "@/components/common/list/list-item/ListItem";
import EmptyListContent from "./EmptyListContent";

import { useListItems } from "@/hooks/useListItems";
import { useGoalList } from "@/hooks/queries/goals/useGoalList";
import { useTodosQuery } from "@/hooks/queries/todos";

import { Goal } from "@/api/types/goal";
import { Todo } from "@/api/types/todo";

export default function TodosContent({
  tab,
}: {
  tab: "ALL" | "TODO" | "DONE";
}) {
  const [goal, setGoal] = useState<Goal | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedGoalId = searchParams.get("goal");
  const goalId = selectedGoalId ? Number(selectedGoalId) : null;

  const {
    data: goalData,
    isLoading: isGoalsLoading,
    isError: isGoalsError,
  } = useGoalList();

  const {
    data: todoData,
    isLoading: isTodoLoading,
    isError: isTodoError,
  } = useTodosQuery();

  const goals: Goal[] = goalData?.goals ?? [];
  const todos: Todo[] = todoData?.todos ?? [];

  const filteredTodos = goalId
    ? todos.filter((todo) => todo.goal?.id === goalId)
    : todos;

  const initialItems = filteredTodos.map((todo) => ({
    id: todo.id,
    label: todo.title,
    checked: todo.done,
    note: !!todo.noteId,
    link: !!todo.linkUrl,
    file: !!todo.fileUrl,
    todo,
  }));

  const { items, onToggleChecked } = useListItems(initialItems);

  let filtered = items;

  if (tab === "TODO") {
    filtered = items.filter((i) => !i.checked);
  }
  if (tab === "DONE") {
    filtered = items.filter((i) => i.checked);
  }

  if (isGoalsLoading || isTodoLoading) return <div>로딩 중..</div>;
  if (isGoalsError || isTodoError) return <div>🚨에러</div>;

  return (
    <div className="flex h-160 flex-col overflow-auto rounded-2xl bg-white px-8 pt-8 pb-8 sm:max-h-screen">
      {filtered.length === 0 ? (
        <EmptyListContent tab={tab} />
      ) : (
        <>
          <GoalSelect
            goals={goals.map((goal) => goal.title)}
            title="목표를 선택하세요."
            value={goal?.title ?? ""}
            onSelect={(title) => {
              const found = goals.find((goal) => goal.title === title) || null;
              setGoal(found);
              router.push(`/todos?goal=${found?.id}`);
            }}
          />
          <div className="mt-4">
            <ListItem
              items={filtered}
              onToggleChecked={onToggleChecked}
              containerClassName="sm:h-120"
            />
          </div>
        </>
      )}
    </div>
  );
}
