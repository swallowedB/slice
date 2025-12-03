"use client";

import MobileHeader from "../../_components/layout/MobileHeader";
import GoalHeader from "./_components/GoalHeader";
import GoalProgressCard from "./_components/GoalProgressCard";
import GoalNotesCard from "./_components/GoalNotesCard";
import GoalTodoSection from "./_components/GoalTodoSection";
import GoalDoneSection from "./_components/GoalDoneSection";
import GoalSection from "./_components/GoalSection";

const mockGoalItem = [
  {
    id: 1,
    title: "자바스크립트로 웹 서비스 만들기",
    todos: [
      { id: 1, label: "사용자 데이터 렌더링 구현", checked: false },
      { id: 2, label: "UI 구현 및 기능 처리", checked: true },
      { id: 3, label: "사용자 데이터 렌더링 구현", checked: false },
      { id: 4, label: "UI 구현 및 기능 처리", checked: true },
    ],
  },
];

export default function GoalsPage() {
  const goal = mockGoalItem[0];
  const goalTodos = goal.todos.filter((t) => !t.checked);
  const goalDones = goal.todos.filter((t) => t.checked);

  return (
    <section>
      <MobileHeader title="체다치즈님의 목표" />

      <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
        체다치즈님의 목표
      </h2>

      {/* 목표 헤더 */}
      <section className="">
        <div className="block w-full gap-8 lg:grid lg:gap-0 xl:grid-cols-1 xl:gap-5 2xl:grid-cols-2">
          <GoalHeader
            title={goal.title}
            onMenuClick={() => console.log("menu")}
          />

          <div className="block sm:grid sm:grid-cols-2 sm:gap-5 lg:block lg:gap-0 xl:mt-0 xl:grid xl:grid-cols-2 xl:gap-5">
            <GoalProgressCard percent={64} />
            <GoalNotesCard goalId={goal.id} />
          </div>
        </div>
      </section>

      <section className="mt-7.5 grid gap-8 lg:mt-20 lg:grid-cols-2">
        <GoalSection
          title="TO DO"
          items={goalDones}
          onToggle={(id) => console.log("toggle todo:", id)}
          onAdd={() => console.log("mock up")}
          emptyMessage="할 일이 없어요!"
          background="bg-orange-100"
        />
        <GoalSection
          title="DONE"
          items={goalTodos}
          onToggle={(id) => console.log("toggle todo:", id)}
          background="bg-white"
        />
      </section>
    </section>
  );
}
