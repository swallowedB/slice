"use client";
import EmptyState from "@/components/common/empty-state/EmptyState";
import GoalCard from "./GoalCard";
import { ListGoalType } from "@/components/common/list/list-item/listItem.types";
import { useState } from "react";

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

export default function Goal() {
  const [openCards, setOpenCards] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    mockGoalItem.forEach((_, index) => (initial[index] = true));
    return initial;
  });
  const onChange = (id: number) => {
    console.log("clicked", id);
  };
  const onToggle = (index: number) => {
    setOpenCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section>
      {/* 목표별 할 일  */}
      <div className="overflow-x-clip">
        <h3 className="mb-2.5 grid items-center pl-2 font-medium sm:text-base lg:text-lg">
          <p className="flex flex-wrap items-center">
            <img
              src="/icons/icon-goal.svg"
              alt="목표 아이콘"
              className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
            />
            목표별 할일
          </p>
        </h3>
        <div>
          <div>
            {mockGoalItem.length === 0 ? (
              <div className={cardStyles}>
                <EmptyState>최근 등록한 할일이 없어요</EmptyState>
              </div>
            ) : (
              mockGoalItem.map((goal, index) => {
                const todoItems = goal.todos.filter((t) => !t.checked);
                const doneItems = goal.todos.filter((t) => t.checked);
                return (
                  <GoalCard
                    key={goal.id}
                    title={goal.title}
                    percent={60}
                    todoItems={todoItems}
                    doneItems={doneItems}
                    isOpen={openCards[index]}
                    onToggle={() => onToggle(index)}
                    onChange={onChange}
                    cardStyles={cardStyles}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
