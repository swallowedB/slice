"use client";

import { useState } from "react";
import GoalSelect from "./GoalSelect";
import ListItem from "@/components/common/list/list-item/ListItem";
import EmptyListContent from "./EmptyListContent";
import { useListItems } from "@/hooks/useListItems";
import { useGoalList } from "@/hooks/queries/goals/useGoalList";
import { Goal } from "@/api/types/goal.types";
import { useTodos } from "@/hooks/queries/useTodos";

export default function TaskListContent({
  tab,
}: {
  tab: "ALL" | "TODO" | "DONE";
}) {
  const [goal, setGoal] = useState<Goal | null>(null);

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

  // 목표, 할일 리스트 배열
  // const goals = goalData?.goals ?? [];
  const goals: Goal[] = goalData?.goals ?? [];
  const todos = todoData?.todos ?? [];

  const initialItems = todos.map((todo) => ({
    id: todo.id,
    label: todo.title,
    checked: todo.done,
    note: !!todo.noteId,
    file: !!todo.fileUrl,
  }));

  const { items, onToggleChecked } = useListItems(initialItems);

  const filtered =
    tab === "ALL"
      ? items
      : tab === "TODO"
        ? items.filter((i) => !i.checked)
        : items.filter((i) => i.checked);

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
