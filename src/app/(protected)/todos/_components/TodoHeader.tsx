"use client";

import clsx from "clsx";
import Button from "@/components/common/button/Button";

const TABS = ["ALL", "TODO", "DONE"] as const;
type TabType = (typeof TABS)[number];

interface TodoHeaderProps {
  tab: TabType;
  onTabChange: (tab: TabType) => void;
  onAdd: () => void;
  className?: string;
}

export default function TodoHeader({
  tab,
  onTabChange,
  onAdd,
}: TodoHeaderProps) {
  return (
    <div className="flex w-[343px] items-center justify-between px-1 py-4 lg:w-[636px] 2xl:w-[720px]">
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

      <Button
        variant="outline-gray"
        size="compact"
        onClick={onAdd}>
        + 할 일 추가
      </Button>
    </div>
  );
}
