"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { todo } from "node:test";

type GoalNotesCardProps = {
  goalId: string;
  todoId: string;
};

export default function GoalNotesCard({ goalId, todoId }: GoalNotesCardProps) {
  return (
    <Link
      href={`/notes?goalId=${goalId}`}
      className="transition-al l mt-4 flex h-40 items-end rounded-4xl bg-blue-200 bg-[url('/images/goals/obj-note.png')] bg-size-[98px_auto] bg-position-[right_14px_top_14px] bg-no-repeat px-10 py-7.5 text-white shadow-[0_10px_40px_0_rgba(0,212,190,0.24)] sm:mt-0 sm:h-auto sm:bg-position-[right_4px_top_14px] lg:h-31.25 lg:py-4 xl:h-auto xl:py-7.5">
      <div className="flex items-center gap-1 text-2xl font-bold break-keep sm:text-xl lg:text-2xl">
        노트 모아보기
        <ChevronRightIcon className="ml-0.5 w-5 sm:w-3.5 lg:w-5" />
      </div>
    </Link>
  );
}
