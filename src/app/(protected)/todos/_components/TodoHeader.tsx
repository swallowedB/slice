"use client";

import clsx from "clsx";
import PageHeader from "../../_components/layout/PageHeader";
import MobileHeader from "../../_components/layout/MobileHeader";
import TodoButton from "@/app/(protected)/_components/todo-button/TodoButton";

const TABS = ["ALL", "TODO", "DONE"] as const;
type TabType = (typeof TABS)[number];

interface TodoHeaderProps {
  tab: TabType;
  onTabChange: (tab: TabType) => void;
  onAdd: () => void;
  count: number;
  className?: string;
}

export default function TodoHeader({
  tab,
  onTabChange,
  count,
  className,
}: TodoHeaderProps) {
  return (
    <div className={clsx("top-0 z-30", className)}>
      {/* 데스크탑 헤더 */}
      <h2 className="color-black hidden sm:block sm:pl-4 sm:text-2xl sm:font-semibold">
        <PageHeader
          title="모든 할 일"
          count={count}
          desktopClassName="sm:mb-6"
        />
      </h2>

      {/* 모바일 헤더 */}
      <MobileHeader
        title="모든 할 일"
        count={count}
      />

      {/* 탭 + 할 일 추가 */}
      <div className="flex items-center justify-between px-2 pb-4 2xl:w-[720px]">
        <div className="flex">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => onTabChange(t)}
              className={clsx(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-bold transition-colors",
                tab === t ? "bg-[#FFA56533] text-orange-400" : "text-[#A4A4A4]",
              )}>
              {t === "ALL" && "ALL"}
              {t === "TODO" && "TO DO"}
              {t === "DONE" && "DONE"}
            </button>
          ))}
        </div>

        <TodoButton />
      </div>
    </div>
  );
}
