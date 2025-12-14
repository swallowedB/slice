"use client";

import { useGoalList } from "@/hooks/queries/goals";
import NavigationGoalListItem from "./NavigationGoalListItem";

export default function NavigationGoalSection() {
  const { data, isLoading, isError } = useGoalList();
  const goals = data?.goals ?? [];

  return (
    <section>
      {/* 목표 리스트 */}
      <ul className="flex flex-col items-start text-sm">
        {goals.map((item) => (
          <NavigationGoalListItem
            key={item.id}
            title={item.title}
            href={`/goals/${item.id}`}
          />
        ))}
      </ul>

      {/* 새 목표 input */}
      <div className="mt-1">
        <input
          aria-label="새 목표 입력"
          autoFocus
          className="bg-orange-250/15 w-full border-b-2 border-orange-400 px-4 py-3 text-sm font-medium text-black outline-none placeholder:text-orange-400/60 focus:ring-0"
          placeholder="새 목표를 입력하고 Enter를 눌러주세요"
        />
      </div>
    </section>
  );
}
