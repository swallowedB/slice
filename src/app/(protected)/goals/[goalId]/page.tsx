"use client";
import { ListGoalType } from "@/components/common/list/list-item/listItem.types";
import Progress from "@/components/progress/Progress";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MobileHeader from "../../_components/layout/MobileHeader";
const mockGoalItem: ListGoalType[] = [
  {
    id: 1,
    title: "자바스크립트로 웹 서비스 만들기",
    todos: [
      { id: 1, label: "사용자 데이터 렌더링 구현", checked: false },
      { id: 2, label: "UI 구현 및 기능 처리", checked: true },
    ],
  },
];
export default function GoalsPage() {
  const goal = mockGoalItem[0]; // 지금 목업은 1개
  const todos = goal.todos.filter((t) => !t.checked);
  const dones = goal.todos.filter((t) => t.checked);

  return (
    <>
      <MobileHeader title="체다치즈님의 목표" />
      <div className="h-screen">
        <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
          체다치즈님의 목표
        </h2>

        {/* 목표 타이틀 영역 */}
        <section className="mb-6">
          <div className="grid w-full grid-cols-2 gap-8">
            <div className="flex items-center gap-3 rounded-4xl bg-white px-10 py-15">
              <img
                src="/icons/icon-goal.svg"
                alt="목표 아이콘"
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
              <h3 className="text-2xl font-semibold">{goal.title}</h3>

              <button className="ml-auto">
                <EllipsisVerticalIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-orange-250 rounded-4xl py-8.5">
                <Progress
                  percent={64}
                  title="목표 진행도"
                />
              </div>
              <div className="flex items-center rounded-4xl bg-blue-200 bg-[url(/images/goals/obj-note.png)] bg-no-repeat shadow-[0_10px_40px_0_rgba(0,212,190,0.24)] transition-all lg:bg-[length:97px_auto] lg:bg-[right_4px_top_-14px] lg:p-7.5 lg:hover:shadow-[0_10px_40px_0_rgba(0,212,190,0.24)]">
                <Link
                  href="/notes/1"
                  className="flex items-center gap-1">
                  노트 모아보기 <PlusIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Todo / Done 영역 */}
        <section className="grid grid-cols-2 gap-4">
          {/* Todo */}
          <div className="rounded-xl border p-4">
            <h4 className="mb-2 font-semibold">할 일</h4>
            {todos.length === 0 && <p>할 일이 없어요!</p>}
            {todos.map((todo) => (
              <p key={todo.id}>• {todo.label}</p>
            ))}
          </div>

          {/* Done */}
          <div className="rounded-xl border p-4">
            <h4 className="mb-2 font-semibold">완료됨</h4>
            {dones.length === 0 && <p>아직 완료된 일이 없어요</p>}
            {dones.map((t) => (
              <p key={t.id}>✓ {t.label}</p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
