"use client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import { ListSkeleton } from "@/components/skeleton/ListSkeleton";
import { ErrorBoundary } from "@/components/error-boundary";
import RecentTodosContent from "./RecentTodosContent";

export default function RecentTodos() {
  return (
    <div className="w-full">
      <h3 className="mb-2.5 flex flex-wrap items-center justify-between pr-3.5 pl-2 text-base font-medium sm:text-sm lg:text-lg xl:text-base">
        <p className="flex flex-wrap items-center">
          <img
            src="/icons/icon-todo.svg"
            alt="할일 아이콘"
            className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
          />
          최근 등록한 할일
        </p>
        <Link
          className="text-orange-250 flex items-center text-sm font-semibold lg:text-base"
          href="/todos">
          모두 보기
          <ChevronRightIcon className="text-orange-250 ml-0.5 w-3.5 lg:w-5" />
        </Link>
      </h3>

      <div className="bg-orange-250 h-auto rounded-[28px] px-4 py-4.5 shadow-[0_10px_40px_0_rgba(255,158,89,0.4)] transition-all sm:h-53 sm:p-3.75 lg:h-64 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_10px_40px_0_rgba(255,158,89,0.4)]">
        <ErrorBoundary>
          <Suspense
            fallback={
              <ListSkeleton
                count={4}
                rowClassName="h-10 lg:h-11 bg-white/40"
              />
            }>
            <RecentTodosContent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
