"use client";

import MobileHeader from "../../_components/layout/MobileHeader";
import GoalHeader from "./_components/GoalHeader";
import GoalProgressCard from "./_components/GoalProgressCard";
import GoalNotesCard from "./_components/GoalNotesCard";
import Goal from "./_components/Goal";
import { ListGoalType } from "@/components/common/list/list-item/listItem.types";
import { useState } from "react";

const mockGoalItem: ListGoalType[] = [
  {
    id: 1111,
    title: "자바스크립트로 웹 서비스 만들기",
    todos: [
      {
        id: 11112,
        label: "사용자 데이터 렌더링 구현 구현 구현 구현 구현 구현 구현",
        file: true,
        note: true,
        checked: false,
      },
      { id: 11113, label: "UI 구현 및 기능 처리", checked: true },
      { id: 11114, label: "사용자 데이터 렌더링 구현", checked: false },
      { id: 11115, label: "UI 구현 및 기능 처리", checked: true },
    ],
  },
];

export default function GoalsPage() {
  const goal = mockGoalItem[0];
  const [goals, setGoals] = useState<ListGoalType[]>(mockGoalItem);
  //   const handleDeleteTodo = (goalId: number, todoId: number) => {
  //     setGoals((prevGoals) =>
  //       prevGoals.map((goal) =>
  //         goal.id === goalId
  //           ? {
  //               ...goal,
  //               todos: goal.todos.filter((t) => t.id !== todoId),
  //             }
  //           : goal,
  //       ),
  //     );
  //   };
  return (
    <>
      <MobileHeader title="체다치즈님의 목표" />
      <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
        체다치즈님의 목표
      </h2>
      {/* 목표 헤더 */}
      <section className="mb-7.5 w-full lg:mb-20">
        <div className="block w-full sm:grid lg:grid-cols-1 lg:gap-x-0 xl:gap-x-8 2xl:grid-cols-2">
          <GoalHeader
            title={goal.title}
            onMenuClick={() => console.log("menu")}
          />

          <div className="block sm:grid sm:grid-cols-2 sm:gap-x-5 lg:mt-5 lg:gap-x-5 xl:mt-5 xl:grid xl:grid-cols-2 2xl:mt-0">
            <GoalProgressCard percent={64} />
            <GoalNotesCard goalId={goal.id} />
          </div>
        </div>
      </section>
      <Goal goal={goal} />
    </>
  );
}
