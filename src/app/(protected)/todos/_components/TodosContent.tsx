"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import GoalSelect from "./GoalSelect";
import ListItem from "@/components/common/list/list-item/ListItem";
import EmptyListContent from "./EmptyListContent";
import TodoListSkeleton from "./TodoListSkeleton";

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

  const { data: goalData, isLoading: isGoalsLoading } = useGoalList();

  const goals: Goal[] = goalData?.goals ?? [];

  // 선택한 목표 값 유지
  useEffect(() => {
    if (goalId && goals.length > 0 && !goal) {
      const found = goals.find((g) => g.id === goalId);
      if (found) {
        setGoal(found);
      }
    }
  }, [goalId, goals, goal]);

  // 무한스크롤
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isTodosLoading,
  } = useInfiniteTodos(goalId);

  const todos: Todo[] = data?.pages.flatMap((page) => page.todos) ?? [];

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

  if (isGoalsLoading || isTodosLoading) {
    return <TodoListSkeleton />;
  }

  // 드롭다운에 모든 할 일 조회용 '전체' 추가
  const handleGoalSelect = (title: string) => {
    if (title === "전체") {
      setGoal(null);
      router.push("/todos");
    } else {
      const found = goals.find((g) => g.title === title) ?? null;
      setGoal(found);
      router.push(found ? `/todos?goal=${found.id}` : "/todos");
    }
  };

  let filtered = items;

  if (tab === "TODO") {
    filtered = items.filter((i) => !i.checked);
  }
  if (tab === "DONE") {
    filtered = items.filter((i) => i.checked);
  }

  if (filtered.length === 0)
    return (
      <div className="flex flex-col rounded-2xl bg-white p-8">
        <EmptyListContent tab={tab} />
      </div>
    );

  return (
    <section className="flex flex-col rounded-2xl bg-white p-4 pb-12 sm:p-8 sm:pb-12">
      <GoalSelect
        goals={["전체", ...goals.map((g) => g.title)]}
        title="전체"
        value={goal?.title ?? "전체"}
        onSelect={handleGoalSelect}
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
    </section>
  );
}
