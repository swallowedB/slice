"use client";

import { useEffect, useState } from "react";
import {
  ListGoalType,
  ListTodoType,
} from "@/components/common/list/list-item/listItem.types";

import RecentTodos from "./_components/recent/RecentTodos";
import ProgressTodos from "./_components/progress/ProgressTodos";
import Goal from "./_components/goal/Goal";

const mockRecentItem: ListTodoType[] = [
  { id: 1, label: "사용자 데이터 렌더링 구현", checked: false, link: true },
  { id: 2, label: "기능 구현", checked: false, link: true, file: true },
  { id: 3, label: "UI 구현", checked: false, link: true, note: true },
];
const mockGoalItem: ListGoalType[] = [
  {
    id: 1,
    title: "자바스크립트로 웹 서비스 만들기",
    todos: [
      { id: 1, label: "사용자 데이터 렌더링 구현", checked: false },
      { id: 2, label: "UI 구현 및 기능 처리", checked: true },
    ],
  },
  { id: 2, title: "TypeScript 리팩터링 하기", todos: [] },
  { id: 3, title: "", todos: [] },
];

const cardStyles =
  "relative mt-4 rounded-[28px] bg-white px-4 py-6.5 pb-11 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] \
   transition-all sm:p-4 sm:pt-7.5 lg:rounded-[40px] lg:p-7.5 \
   lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]";

export default function DashBoardPage() {
  const onChange = (id: number) => {
    console.log("clicked", id);
  };
  const onToggle = (index: number) => {
    setOpenCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [mounted, setMounted] = useState(false);
  const [openCards, setOpenCards] = useState<Record<number, boolean>>(() => {
    // 처음부터 모든 GoalCard 펼치기
    const initial: Record<number, boolean> = {};
    mockGoalItem.forEach((_, index) => (initial[index] = true));
    return initial;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen">
      <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
        체다치즈님의 대시보드
      </h2>

      {/* 최근 할일 + 진행도 섹션 */}
      <section className="mb-7.5 sm:mb-8 lg:mb-8.5">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-3 lg:gap-8">
          <RecentTodos
            mockRecentItem={mockRecentItem}
            onChange={onChange}
          />
          <ProgressTodos mounted={mounted} />
        </div>
      </section>

      {/* 목표별 섹션 */}
      <Goal
        mockGoalItem={mockGoalItem}
        cardStyles={cardStyles}
        onToggle={onToggle}
        onChange={onChange}
        openCards={openCards}
      />
    </div>
  );
}
