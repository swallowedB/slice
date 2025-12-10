"use client";

import { useState } from "react";
import GoalSelect from "./GoalSelect";
import ListItem from "@/components/common/list/list-item/ListItem";
import EmptyListContent from "./EmptyListContent";
import { useListItems } from "@/hooks/useListItems";
import { useGoalList } from "@/hooks/queries/goals/useGoalList";
import { Goal } from "@/api/types/goal";
import { useTodos } from "@/hooks/queries/todos";
import { Todo } from "@/api/types/todo";

export default function TodosContent({
  tab,
}: {
  tab: "ALL" | "TODO" | "DONE";
}) {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  // 목표 리스트 조회
  const {
    data: goalData,
    isLoading: isGoalsLoading,
    isError: isGoalsError,
  } = useGoalList();

  // 할일 목록 조회
  const {
    data: todoData,
    isLoading: isTodoLoading,
    isError: isTodoError,
  } = useTodos();

  const goals: Goal[] = goalData?.goals ?? [];
  const todos: Todo[] = todoData?.todos ?? [];

  const filteredTodos = selectedGoalId
    ? todos.filter((todo) => todo.goal?.id == selectedGoalId)
    : todos;

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
    <div className="flex flex-col rounded-2xl bg-white px-4 pt-4 pb-8">
      {filtered.length === 0 ? (
        <EmptyListContent tab={tab} />
      ) : (
        <>
          <GoalSelect
            goals={goals.map((g) => g.title)}
            title="목표를 선택하세요."
            value={goal?.title ?? ""}
            onSelect={(title) => {
              const found = goals.find((g) => g.title === title) || null;
              setGoal(found);
              setSelectedGoalId(found?.id ?? null);
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
