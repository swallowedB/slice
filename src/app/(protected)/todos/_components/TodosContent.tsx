"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import GoalSelect from "./GoalSelect";
import ListItem from "@/components/common/list/list-item/ListItem";
import EmptyListContent from "./EmptyListContent";

import { useListItems } from "@/hooks/useListItems";
import { useGoalList } from "@/hooks/queries/goals/useGoalList";
import { useInfiniteTodos } from "@/hooks/queries/todos/useInfiniteQuery";
import { useInView } from "react-intersection-observer";

import { Goal } from "@/api/types/goal";
import { Todo } from "@/api/types/todo";

export default function TodosContent({
  tab,
}: {
  tab: "ALL" | "TODO" | "DONE";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedGoalId = searchParams.get("goal");
  const goalId = selectedGoalId ? Number(selectedGoalId) : undefined;

  const [goal, setGoal] = useState<Goal | null>(null);

  const {
    data: goalData,
    isLoading: isGoalsLoading,
    isError: isGoalsError,
  } = useGoalList();

  const goals: Goal[] = goalData?.goals ?? [];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteTodos(goalId);

  const todos: Todo[] = data?.pages.flatMap((page) => page.todos) ?? [];

  // 무한스크롤
  // react-intersection-observer로 감지
  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 할 일 목록
  const initialItems = todos.map((todo) => ({
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

  // if (isGoalsLoading || isTodosLoading) return <div>로딩 중..</div>;
  // if (isGoalsError || isTodosError) return <div>🚨 에러</div>;

  if (filtered.length === 0)
    return (
      <div className="flex flex-col rounded-2xl bg-white px-8 pt-8 pb-8">
        <EmptyListContent tab={tab} />;
      </div>
    );

  return (
    <div className="flex flex-col rounded-2xl bg-white px-4 py-4 sm:px-8 sm:py-8">
      <GoalSelect
        goals={goals.map((g) => g.title)}
        title="목표를 선택하세요."
        value={goal?.title ?? ""}
        onSelect={(title) => {
          const found = goals.find((g) => g.title === title) ?? null;
          setGoal(found);
          router.push(found ? `/todos?goal=${found.id}` : "/todos");
        }}
      />

      <div className="mt-4">
        <ListItem
          items={filtered}
          onToggleChecked={onToggleChecked}
        />
      </div>
      {/* 감지용 sentinel */}
      {hasNextPage && !isFetchingNextPage && (
        <div
          ref={ref}
          className="h-3"
        />
      )}

      {isFetchingNextPage && <div>할 일을 불러오는 중입니다 . . .</div>}
    </div>
  );
}
