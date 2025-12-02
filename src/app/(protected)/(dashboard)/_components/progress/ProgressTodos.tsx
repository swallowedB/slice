"use client";
import Progress from "@/components/progress/Progress";
import { useEffect, useState } from "react";

export default function ProgressTodos() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
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

      <div className="h-46.5 rounded-[28px] bg-blue-200 bg-[url(/images/dashboard/obj-progress.png)] bg-[length:151px_auto] bg-[right_8px_bottom_-54px] bg-no-repeat shadow-[0_10px_40px_0_rgba(0,212,190,0.24)] transition-all sm:bg-[right_-24px_bottom_-54px] lg:h-64 lg:rounded-[40px] lg:bg-[length:222px_auto] lg:bg-[right_-4px_bottom_-45px] lg:hover:shadow-[0_10px_40px_0_rgba(0,212,190,0.24)]">
        {mounted && (
          <Progress
            percent={30}
            variant="large"
            title={`체다치즈님의 진행도는`}
          />
        )}
      </div>
    </div>
  );
}
