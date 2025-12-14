"use client";

import { useActiveGoalId } from "@/app/(protected)/_components/navigation/hooks/useActiveGoalId";
import { useNewGoalInput } from "@/app/(protected)/_components/navigation/hooks/useNewGoalInput";
import { useGoalList } from "@/hooks/queries/goals";
import NavigationGoalListItem from "./NavigationGoalListItem";

interface Props {
  newGoalInputSignal: number;
}

export default function NavigationGoalSection({ newGoalInputSignal }: Props) {
  const { data, isLoading, isError } = useGoalList();
  const goals = data?.goals ?? [];

  const activeGoalId = useActiveGoalId();

  const {
    isCreating,
    title,
    isPending,
    inputRef,
    containerRef,
    setTitle,
    onKeyDown,
    onBlur,
  } = useNewGoalInput({ newGoalInputSignal });

  return (
    <section>
      {/* 목표 리스트 */}
      <ul className="flex flex-col items-start text-sm">
        {isLoading && (
          <li className="w-full px-4 py-3 text-sm text-gray-400">
            불러오는 중…
          </li>
        )}

        {isError && !isLoading && (
          <li className="w-full px-4 py-3 text-sm text-red-500">
            목표 목록을 불러오지 못했어요.
          </li>
        )}

        {!isLoading && !isError && goals.length === 0 && (
          <li className="w-full px-4 py-3 text-sm text-gray-400">
            아직 목표가 없어요. ‘새 목표’를 눌러 추가해 주세요.
          </li>
        )}

        {!isLoading &&
          !isError &&
          goals.map((item) => (
            <NavigationGoalListItem
              key={item.id}
              title={item.title}
              href={`/goals/${item.id}`}
              isActive={item.id === activeGoalId}
            />
          ))}
      </ul>

      {/* 새 목표 input */}
      {isCreating && (
        <div
          ref={containerRef}
          className="mt-1">
          <input
            ref={inputRef}
            aria-label="새 목표 입력"
            className="bg-orange-250/15 w-full border-b-2 border-orange-400 px-4 py-3 text-sm font-medium text-black outline-none placeholder:text-orange-400/60 focus:ring-0"
            placeholder={
              isPending ? "생성 중…" : "새 목표를 입력하고 Enter 하세요."
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            disabled={isPending}
          />
        </div>
      )}
    </section>
  );
}
