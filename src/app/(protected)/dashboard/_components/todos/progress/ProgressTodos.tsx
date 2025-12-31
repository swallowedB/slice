"use client";
import ProgressCardSkeleton from "@/components/skeleton/ProgressCardSkeleton";
import ProgressContent from "./ProgressContent";
import { useAuthStore } from "@/store/useAuthStore";
import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";

export default function ProgressTodos() {
  const user = useAuthStore((state) => state.user);

  const nickname = user?.name ?? "";

  return (
    <div className="mt-7.5 w-full sm:mt-0">
      <h3 className="mb-2.5 flex flex-wrap items-center pl-2 text-base font-medium sm:text-sm lg:text-lg xl:text-base">
        <img
          src="/icons/icon-progress.svg"
          alt="진행 아이콘"
          className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
        />
        내 진행 상황
      </h3>

      <div className="h-46.5 rounded-[28px] bg-blue-200 bg-[url(/images/dashboard/obj-progress.png)] bg-size-[151px_auto] bg-position-[right_8px_bottom_-54px] bg-no-repeat shadow-[0_10px_40px_0_rgba(0,212,190,0.24)] transition-all sm:h-53 sm:bg-position-[right_-24px_bottom_-54px] lg:h-64 lg:rounded-[40px] lg:bg-size-[222px_auto] lg:bg-position-[right_-4px_bottom_-45px] lg:hover:shadow-[0_10px_40px_0_rgba(0,212,190,0.24)]">
        <div className="flex h-full items-center justify-start gap-5 pl-6 lg:pl-10 xl:justify-center xl:gap-3 xl:pl-0 2xl:justify-start 2xl:gap-6 2xl:pl-12">
          <AsyncBoundary loadingFallback={<ProgressCardSkeleton />}>
            <ProgressContent nickname={nickname} />
          </AsyncBoundary>
        </div>
      </div>
    </div>
  );
}
