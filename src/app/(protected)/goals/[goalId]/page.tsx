// "use client";
// import { ListGoalType } from "@/components/common/list/list-item/listItem.types";
// import Progress from "@/components/progress/Progress";
// import {
//   ChevronRightIcon,
//   EllipsisVerticalIcon,
//   PlusIcon,
// } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import MobileHeader from "../../_components/layout/MobileHeader";
// import { useEffect, useState } from "react";
// import Button from "@/components/common/button/Button";
// import TextButton from "@/components/common/button/TextButton";
// import ListItem from "@/components/common/list/list-item/ListItem";
// const mockGoalItem: ListGoalType[] = [
//   {
//     id: 1,
//     title: "자바스크립트로 웹 서비스 만들기",
//     todos: [
//       { id: 1, label: "사용자 데이터 렌더링 구현", checked: false },
//       { id: 2, label: "UI 구현 및 기능 처리", checked: true },
//       { id: 3, label: "사용자 데이터 렌더링 구현", checked: false },
//       { id: 4, label: "UI 구현 및 기능 처리", checked: true },
//     ],
//   },
// ];
// export default function GoalsPage() {
//   const goal = mockGoalItem[0]; // 지금 목업은 1개
//   const goalTodos = goal.todos.filter((t) => !t.checked);
//   const goalDones = goal.todos.filter((t) => t.checked);
// "use client";
// import { ListGoalType } from "@/components/common/list/list-item/listItem.types";
// import MobileHeader from "../../_components/layout/MobileHeader";
// import GoalHeader from "./_components/GoalHeader";
// import GoalProgressCard from "./_components/GoalProgressCard";
// import GoalNotesCard from "./_components/GoalNotesCard";
// import GoalTodoSection from "./_components/GoalTodoSection";
// import GoalDoneSection from "./_components/GoalDoneSection";

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <>
//       <MobileHeader title="체다치즈님의 목표" />
//       <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
//         체다치즈님의 목표
//       </h2>

//       {/* 목표 타이틀 영역 */}
//       <div className="overflow-clip">
//         <section className="mb-6">
//           <div className="block w-full gap-8 xl:grid-cols-2 2xl:grid">
//             <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 sm:rounded-3xl sm:px-6 sm:py-6 md:px-3 md:py-8.75 xl:rounded-4xl xl:px-10 xl:py-15">
//               <img
//                 src="/icons/icon-goal.svg"
//                 alt="목표 아이콘"
//                 className="h-8 w-8 xl:h-10 xl:w-10"
//               />
//               <h3 className="truncate text-base font-semibold break-keep sm:text-xl xl:text-2xl">
//                 {goal.title}
//               </h3>

//               <button className="ml-auto cursor-pointer">
//                 <EllipsisVerticalIcon className="h-6 w-6 text-gray-400" />
//               </button>
//             </div>

//             <div className="mt-4 block sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-5 lg:block xl:grid xl:grid-cols-2 xl:gap-5 2xl:mt-0">
//               <div className="bg-orange-250 rounded-4xl p-8.5 px-8 py-8.5 sm:px-0 lg:mt-5 lg:py-4 xl:py-8.5 2xl:mt-0">
//                 {mounted && (
//                   <div className="flex h-full items-center justify-center gap-7.5">
//                     <Progress
//                       percent={64}
//                       variant="default"
//                       title={`목표 진행도`}
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="mt-4 flex h-40 items-end rounded-4xl bg-blue-200 bg-[url('/images/goals/obj-note.png')] bg-[length:98px_auto] bg-[right_14px_top_14px] bg-no-repeat px-10 py-7.5 text-white shadow-[0_10px_40px_0_rgba(0,212,190,0.24)] transition-all sm:mt-0 sm:bg-[right_4px_top_14px] lg:mt-5 lg:py-11.5 lg:hover:shadow-[0_10px_40px_0_rgba(0,212,190,0.24)] 2xl:mt-0">
//                 <Link
//                   href="/notes/1"
//                   className="flex items-center gap-1 text-2xl font-bold break-keep sm:text-xl lg:text-2xl">
//                   노트 모아보기
//                   <ChevronRightIcon className="ml-0.5 w-5 sm:w-3.5 lg:w-5" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Todo / Done 영역 */}
//         <section className="mt-7.5 grid gap-8 sm:mt-10 lg:mt-20 lg:grid-cols-2">
//           {/* Todo */}
//           <div>
//             <div className="mb-2.5 flex h-10.5 items-center justify-between">
//               <h4 className="pl-2 text-lg font-semibold">TO DO</h4>
//               <Button
//                 variant="outline-gray"
//                 size="compact"
//                 className="hidden sm:block"
//                 onClick={() => console.log("mock up")}>
//                 <p className="absolute top-7.25 right-5 flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
//                   <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
//                   할일추가
//                 </p>
//               </Button>

//               <TextButton
//                 variant="primary"
//                 className="block sm:hidden"
//                 onClick={() => console.log("mock up")}>
//                 <p className="flex w-18.5 items-center justify-center font-semibold sm:static sm:w-full">
//                   <PlusIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5" />
//                   할일추가
//                 </p>
//               </TextButton>
//             </div>
//             {goalTodos.length === 0 && <p>할 일이 없어요!</p>}
//             <div className="rounded-2xl bg-orange-100 px-4 py-6 sm:h-64 sm:px-6 sm:py-8 lg:rounded-3xl xl:max-h-130">
//               <ListItem
//                 className="grid sm:gap-0.5 lg:gap-1"
//                 items={goalTodos}
//                 onChange={() => console.log("mock up")}
//               />
//             </div>
//           </div>

//           {/* done */}
//           <div>
//             <div className="mb-2.5 flex h-10.5 items-center justify-between">
//               <h4 className="pl-2 text-lg font-semibold">DONE</h4>
//             </div>
//             <div className="rounded-2xl bg-white px-4 py-6 sm:h-64 sm:px-6 sm:py-8 lg:rounded-3xl xl:max-h-130">
//               <ListItem
//                 className="grid sm:gap-0.5 lg:gap-1"
//                 items={goalDones}
//                 onChange={() => console.log("mock up")}
//               />
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }
"use client";

import MobileHeader from "../../_components/layout/MobileHeader";
import GoalHeader from "./_components/GoalHeader";
import GoalProgressCard from "./_components/GoalProgressCard";
import GoalNotesCard from "./_components/GoalNotesCard";
import GoalTodoSection from "./_components/GoalTodoSection";
import GoalDoneSection from "./_components/GoalDoneSection";

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
    <>
      <MobileHeader title="체다치즈님의 목표" />

      <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
        체다치즈님의 목표
      </h2>

      <div className="overflow-clip">
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

        {/* TODO / DONE */}
        <section className="mt-7.5 grid gap-8 lg:mt-20 lg:grid-cols-2">
          <GoalTodoSection
            items={goalTodos}
            onAdd={() => console.log("add")}
            onToggle={(id) => console.log("toggle todo:", id)}
          />
          <GoalDoneSection
            items={goalDones}
            onToggle={(id) => console.log("toggle done:", id)}
          />
        </section>
      </div>
    </>
  );
}
