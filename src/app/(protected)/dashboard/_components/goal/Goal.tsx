"use client";
import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";
import GoalSkeletion from "./GoalSkeleton";
import GoalList from "./GoalList";

export const cardStyles =
  "relative mt-4 rounded-[28px] bg-white px-4 py-6.5 pb-11 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] transition-all sm:p-4 sm:pt-7.5 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]";

export default function Goal() {
  return (
    <section>
      <h3 className="mb-3 flex flex-wrap items-center pl-2 text-base font-medium sm:text-sm lg:text-lg xl:text-base">
        <img
          src="/icons/icon-goal.svg"
          alt="진행 아이콘"
          className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
        />
        목표별 할 일
      </h3>

      <AsyncBoundary loadingFallback={<GoalSkeletion />}>
        <GoalList />
      </AsyncBoundary>
    </section>
  );
}
