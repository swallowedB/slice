"use client";
import EmptyState from "@/components/common/empty-state/EmptyState";
import GoalCard from "./GoalCard";
import { ListGoalType } from "@/components/common/list/list-item/listItem.types";
import { useState } from "react";
import { EMPTY_MESSAGES } from "@/constants/messages";

const mockGoalItem: ListGoalType[] = [
  {
    id: 1,
    title: "자바스크립트로 웹 서비스 만들기",
    todos: [
      {
        id: 11,
        label: "사용자 데이터 렌더링 구현",
        checked: false,
      },
      { id: 12, label: "UI 구현 및 기능 처리", checked: true },
    ],
  },
  {
    id: 2,
    title: "TypeScript 리팩터링 하기",
    todos: [
      {
        id: 21,
        label: "사용자 데이터 렌더링 구현",
        checked: false,
      },
      { id: 22, label: "UI 구현 및 기능 처리", checked: true },
    ],
  },
  { id: 3, title: "퍼블리싱 하기", todos: [] },
  { id: 4, title: "", todos: [] },
];

const cardStyles =
  "relative mt-4 rounded-[28px] bg-white px-4 py-6.5 pb-11 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] \
   transition-all sm:p-4 sm:pt-7.5 lg:rounded-[40px] lg:p-7.5 \
   lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]";

export default function Goal() {
  const [openCards, setOpenCards] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    mockGoalItem.forEach((goal) => {
      initial[goal.id] = true;
    });
    return initial;
  });

  const onToggleCard = (id: number) => {
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section>
      {/* 목표별 할 일  */}
      <div className="overflow-x-clip">
        <h3 className="mb-2.5 grid items-center pl-2 text-base font-medium sm:text-sm lg:text-lg xl:text-base">
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
                <EmptyState>{EMPTY_MESSAGES.GOAL.RECENT}</EmptyState>
              </div>
            ) : (
              mockGoalItem.map((goal) => {
                const todoItems = goal.todos.filter((t) => !t.checked);
                const doneItems = goal.todos.filter((t) => t.checked);
                return (
                  <GoalCard
                    key={goal.id}
                    title={goal.title}
                    percent={60}
                    todoItems={todoItems}
                    doneItems={doneItems}
                    isOpen={openCards[goal.id]}
                    onToggle={() => onToggleCard(goal.id)}
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
