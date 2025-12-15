"use client";

import clsx from "clsx";
import TodoButton from "@/app/(protected)/_components/todo-button/TodoButton";

const TABS = ["ALL", "TODO", "DONE"] as const;
type TabType = (typeof TABS)[number];

interface TodoHeaderProps {
  tab: TabType;
  onTabChange: (tab: TabType) => void;
  onAdd: () => void;
  className?: string;
}

export default function TodoHeader({ tab, onTabChange }: TodoHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4 2xl:w-[720px]">
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
  );
}
