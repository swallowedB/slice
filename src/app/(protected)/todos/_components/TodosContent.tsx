"use client";

import { useRouter, useSearchParams } from "next/navigation";

import GoalSelect from "./GoalSelect";
import ListItem from "@/components/common/list/list-item/ListItem";
import EmptyListContent from "./EmptyListContent";
import { useListItems } from "@/hooks/useListItems";
import { useGoalList } from "@/hooks/queries/goals/useGoalList";
import { Goal } from "@/api/types/goal";
import { useTodosQuery } from "@/hooks/queries/todos";
import { Todo } from "@/api/types/todo";

export default function TodosContent({
  tab,
}: {
  tab: "ALL" | "TODO" | "DONE";
}) {
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

  const foundGoal = goals.find((goal) => goal.id === goalId) || null;

  const initialItems = filteredTodos.map((todo) => ({
    id: todo.id,
    label: todo.title,
    checked: todo.done,
    note: !!todo.noteId,
    link: !!todo.linkUrl,
    file: !!todo.fileUrl,
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
    <div className="flex flex-col rounded-2xl bg-white px-4 pt-4 pb-6 sm:h-160 lg:h-240">
      {filtered.length === 0 ? (
        <EmptyListContent tab={tab} />
      ) : (
        <>
          <GoalSelect
            goals={goals.map((goal) => goal.title)}
            title="목표를 선택하세요."
            value={foundGoal?.title ?? ""}
            onSelect={(title) => {
              const found = goals.find((goal) => goal.title === title) || null;
              router.push(`/todos?goal=${found?.id}`);
            }}
          />
          <div className="mt-4">
            <ListItem
              items={filtered}
              onToggleChecked={onToggleChecked}
            />
          </div>
        </>
      )}
    </div>
  );
}
