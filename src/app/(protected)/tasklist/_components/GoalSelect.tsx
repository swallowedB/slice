"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SelectBox from "@/components/common/selectBox/SelectBox";

interface GoalSelectProps {
  title: string;
  goals: string[];
  value: string;
  onSelect: (v: string) => void;
}

export default function GoalSelect({
  title,
  goals,
  value,
  onSelect,
}: GoalSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* 상단 목표 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-3xl bg-[#FAFAFA] px-4 py-4 transition-all ${
          open ? "rounded-b-none" : ""
        }`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
            <img
              src="/icons/icon-goal.svg"
              alt="목표 아이콘"
              className="mr-2 h-8 w-8 lg:mr-3 lg:h-10 lg:w-10"
            />
          </div>

          <span className="text-gray-750 font-semibold">{value || title}</span>
        </div>

        <ChevronDownIcon
          className={`h-5 w-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 하위 리스트 */}
      {open && (
        <div className="rounded-b-3xl border border-t-0 border-gray-200 bg-white px-2">
          <SelectBox
            variant="sidebar"
            items={goals}
            onSelect={(item) => {
              onSelect(item);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
