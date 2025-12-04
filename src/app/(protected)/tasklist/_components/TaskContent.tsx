"use client";

import { useState } from "react";
import GoalSelect from "./GoalSelect";
import ListItem from "@/components/common/list/list-item/ListItem";
import EmptyListContent from "./EmptyListContent";
import { useListItems } from "@/hooks/useListItems";
const mockGoals = [
  "자바스크립트로 웹 서비스 만들기",
  "디자인 시스템 강의 듣기",
];

// const mockTasks: any[] = [];

const mockTasks = [
  { id: 1, label: "사용자 데이터 렌더링 구현", checked: false },
  { id: 2, label: "로그인/회원가입 폼 만들기", checked: true, note: true },
  { id: 3, label: "폴더 구조 세팅", checked: false, file: true },
];

export default function TaskListContent({
  tab,
}: {
  tab: "ALL" | "TODO" | "DONE";
}) {
  const [goal, setGoal] = useState("");
  const { items, onToggleChecked } = useListItems(mockTasks);

  const filtered =
    tab === "ALL"
      ? items
      : tab === "TODO"
        ? items.filter((i) => !i.checked)
        : items.filter((i) => i.checked);

  return (
    <>
      {/* 리스트 유무에 따른 화면 분기 */}
      <div
        className={`flex h-[640px] w-[343px] flex-col rounded-2xl bg-white px-4 pt-4 pb-8 md:w-[636px] lg:h-[916px] lg:rounded-3xl lg:px-6 lg:pt-6 lg:pb-10 2xl:h-[900px] 2xl:w-[720px] 2xl:px-8 2xl:pt-8 2xl:pb-8`}>
        {filtered.length === 0 ? (
          <EmptyListContent tab={tab} />
        ) : (
          <>
            <GoalSelect
              goals={mockGoals}
              title="목표를 선택하세요."
              value={goal}
              onSelect={(g) => setGoal(g)}
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
    </>
  );
}
